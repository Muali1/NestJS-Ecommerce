import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { registerDTO } from './dto/register.dto';
@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService , private jwtService:JwtService ){}
    async login(loginCredentials:loginDTO){
        const userExists= await this.prismaService.user.findUnique({where:{email:loginCredentials.email}});
        if(!userExists){
            throw new BadRequestException("Invalid Credentials");
        }
        const IsMatch = await bcrypt.compare(loginCredentials.password,userExists.password);
        if(!IsMatch){
            throw new BadRequestException("incorrect email or password");
        }
        const payload = {id:userExists.id,email:userExists.email};
        const token = this.jwtService.sign(payload);
        return {access_token :token};
    }

    async register(register:registerDTO){
        const userExists=await this.prismaService.user.findUnique({where:{email:register.email}});
        if(userExists){
            throw new BadRequestException("Email is Already Registered");
        }
        const hashed_password = await bcrypt.hash(register.password,10);
        await this.prismaService.user.create({data:{...register,password:hashed_password}});
        return "Registered Successfully";
    }
}
