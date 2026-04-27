import { Body, Controller , Get, Post ,Param ,Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './dto/user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @UseGuards(JwtGuard)
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }
    @UseGuards(JwtGuard)
    @Get(':id')
    getUser(@Param('id') id :string){
       return this.userService.getUser(id);
    }
    @Post()
    createUser(@Body() user:userDTO){
     return this.userService.createUser(user);
    }
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.userService.deletUser(id);
    }
    @UseGuards(JwtGuard)
    @Get(':id/orders')
    getUserOrders(@Param('id') user_id){
        return this.userService.getUserOrders(user_id);
    }
}
