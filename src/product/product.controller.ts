import { Controller, Get, Post, Delete, Body, Param ,UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }
    @UseGuards(JwtGuard)
    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }
    @UseGuards(JwtGuard)
    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productService.getProduct(id);
    }
    @UseGuards(JwtGuard)
    @Post()
    createProduct(@Body() product: ProductDTO) {
        return this.productService.createProduct(product);
    }
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
