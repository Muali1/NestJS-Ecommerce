import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports:[PassportModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory:(cfgService:ConfigService)=>({
                secret:cfgService.get('JWT_SECRET'),
                signOptions:{expiresIn:'1h'}
            }),
            inject:[ConfigService],
        })
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy]
})
export class AuthModule {}
