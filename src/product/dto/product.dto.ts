import { IsString, IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
export class ProductDTO {
    @IsString()
    name: string;

    @IsNumber()
    @Transform(({ value }) => parseFloat(value))

    price: number;

    @IsInt()
    @Transform(({ value }) => parseInt(value))

    stock: number;
}