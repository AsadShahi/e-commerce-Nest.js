import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; // Import necessary modules

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(configService: ConfigService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        })
    }


    async validate(payload: any) { // Properly define the validate method
        return {
            userId: payload.sub,
            mobile: payload.mobile,
            display_name: payload.display_name,
        };
    }

}


