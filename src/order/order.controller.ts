import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }
    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }
    @Get(':order_id')
    getOrder(@Param('order_id') order_id: string) {
        return this.orderService.getOrder(order_id);
    }
    @Post()
    createOrder(@Body() order: OrderDTO) {
        return this.orderService.createOrder(order);
    }
    @Delete(':order_id')
    deleteOrder(@Param('order_id') order_id: string) {
        return this.orderService.deleteOrder(order_id);
    }
}
