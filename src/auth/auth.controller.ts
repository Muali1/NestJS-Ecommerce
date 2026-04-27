import { Controller ,Post ,Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import { registerDTO } from './dto/register.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    login(@Body() userCredentials:loginDTO){
        return this.authService.login(userCredentials);
    }
    @Post('register')
    register(@Body() registerData:registerDTO){
        return this.authService.register(registerData);
    }    
}
