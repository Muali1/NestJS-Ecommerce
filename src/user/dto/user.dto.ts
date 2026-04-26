import { IsAlpha, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class userDTO {
    @IsString()
    @IsAlpha()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    password: string;
}