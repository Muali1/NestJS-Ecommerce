import { Body, Controller , Get, Post ,Param ,Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './dto/user.dto';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }
    @Get(':id')
    getUser(@Param('id') id :string){
       return this.userService.getUser(id);
    }
    @Post()
    createUser(@Body() user:userDTO){
     return this.userService.createUser(user);
    }
    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.userService.deletUser(id);
    }
    @Get(':id/orders')
    getUserOrders(@Param('id') user_id){
        return this.userService.getUserOrders(user_id);
    }
}
