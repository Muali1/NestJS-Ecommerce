import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }
    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productService.getProduct(id);
    }
    @Post()
    createProduct(@Body() product: ProductDTO) {
        return this.productService.createProduct(product);
    }
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
