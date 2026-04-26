import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDTO } from './dto/product.dto';
@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) { }

    getAllProducts() {
        return this.prismaService.product.findMany();
    }
    async getProduct(id: string) {
        const productExist = await this.prismaService.product.findUnique({ where: { id } });
        if (!productExist) {
            throw new BadRequestException("Product Not Found");
        }
        return productExist;
    }
    async createProduct(product: ProductDTO) {
        // const productExists = await this.prismaService.product.findUnique({where:{id}})
        await this.prismaService.product.create({ data: product })
        return "Product Has been created";
    }
    async deleteProduct(id: string) {
        const productExist = await this.prismaService.product.findUnique({ where: { id } });
        if (!productExist) {
            throw new BadRequestException("Product Not Found");
        }
        await this.prismaService.product.delete({ where: { id } });
        return "Product Deleted";
    }

}
