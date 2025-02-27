import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
            
          const token = request?.cookies?.access_token; // Extract token from cookies
          if (!token) {
            return ExtractJwt.fromAuthHeaderAsBearerToken()(request); // Fallback to Bearer Token
          }
          return token;
        },
      ]),
      ignoreExpiration: false, // Better to keep false for security
      secretOrKey: configService.get<string>("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      UserRole: payload.role,
      mobile: payload.mobile,
      name: payload.name,
    };
  }
}
