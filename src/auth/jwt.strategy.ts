import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(cfgService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: cfgService.get<string>('JWT_SECRET'),
        })
    }
    async validate(payload:any){
        return {id:payload.id,email:payload.email};
    }
}
