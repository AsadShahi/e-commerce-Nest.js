import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,//extract jwt token 
    private configService: ConfigService // Inject ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;




    const token = request.cookies['access_token'] || authHeader.split(" ")[1]; // Check both headers and cookies
  
    if (!token) return false;

    try {

      const secret = this.configService.get<string>("JWT_SECRET_KEY"); // Get secret directly here


      const decoded = await this.jwtService.verifyAsync(token, {
        secret, // Pass the secret here explicitly
        ignoreExpiration: true
      });
      
      request.user = decoded; // Attach user data
      
     
      return true;
    } catch (error) {
      console.error("JWT Error:", error.message);
      return false;
    }
  }
}
