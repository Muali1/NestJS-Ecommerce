import { IsAlpha, IsEmail, IsString } from "class-validator";

export class registerDTO{
    @IsString()
    @IsAlpha()
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}
