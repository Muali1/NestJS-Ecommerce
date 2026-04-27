import { Controller, Get, Post, Body, Param, Delete ,UseGuards} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }
    @UseGuards(JwtGuard)
    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }
    @UseGuards(JwtGuard)
    @Get(':order_id')
    getOrder(@Param('order_id') order_id: string) {
        return this.orderService.getOrder(order_id);
    }
    @UseGuards(JwtGuard)
    @Post()
    createOrder(@Body() order: OrderDTO) {
        return this.orderService.createOrder(order);
    }
    @UseGuards(JwtGuard)
    @Delete(':order_id')
    deleteOrder(@Param('order_id') order_id: string) {
        return this.orderService.deleteOrder(order_id);
    }
}
