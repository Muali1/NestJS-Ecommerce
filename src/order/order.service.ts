import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDTO } from './dto/order.dto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) { }
    getAllOrders() {
        return this.prismaService.order.findMany();
    }
    async getOrder(order_id: string) {
        const orderExists = await this.prismaService.order.findUnique({ where: { id: order_id } });
        if (!orderExists) {
            throw new BadRequestException("Order Not Found");
        }
        return orderExists;
    }
    async createOrder(order: OrderDTO) {
        return await this.prismaService.order.create({
            data: {
                userId: order.userId,
                items: {
                    create: order.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    }))
                }
            }
        });
    }

    async deleteOrder(order_id: string) {
        const orderExists = await this.prismaService.order.findUnique({ where: { id: order_id } });
        if (!orderExists) {
            throw new BadRequestException("Order Not Found");
        }
        await this.prismaService.order.delete({ where: { id: order_id } })
        return "Order Deleted"
    }
}
