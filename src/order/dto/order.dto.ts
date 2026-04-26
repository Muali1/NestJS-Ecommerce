import { IsString, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDTO {
    @IsString()
    productId: string;

    @IsInt()
    quantity: number;
}

export class OrderDTO {
    @IsString()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items: OrderItemDTO[];
}