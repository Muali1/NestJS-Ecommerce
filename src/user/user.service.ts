import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }
    getAllUsers() {
        return this.prismaService.user.findMany();
    }
    async getUser(id: string) {
        const userExists = await this.prismaService.user.findUnique({ where: { id } });
        if (!userExists) {
            throw new BadRequestException("User Not Found");
        }
        return userExists;
    }
    async createUser(user: userDTO) {
        const userExists = await this.prismaService.user.findUnique({ where: { email:user.email } });
        if(userExists){
            throw new BadRequestException("User Already registered with this email ");
        }
        const hashed_password = await bcrypt.hash(user.password,10);
        await this.prismaService.user.create({data:{...user,password:hashed_password}});
        return "User Created";
    }
    async deletUser(id: string) {
        const userExists = await this.prismaService.user.findUnique({ where: { id } });
        if (!userExists) {
            throw new BadRequestException("User Not Found");
        }
        await this.prismaService.user.delete({where:{id}});
        return "User Deleted"; 
    }
    async getUserOrders(user_id:string){
        return await this.prismaService.order.findMany({where:{userId:user_id}});
    }

}
