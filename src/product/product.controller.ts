import { Controller, Get, Post, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import{diskStorage}from'multer';
import { extname } from 'path';
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
   @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + extname(file.originalname);
                cb(null, uniqueName);
            }
        })
    }))
    createProduct(@Body() product: ProductDTO,@UploadedFile() file: Express.Multer.File
) {
        return this.productService.createProduct(product,file?.filename);
    }
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
