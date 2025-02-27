import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';



@Module({
    imports: [
        UsersModule, // Import UsersModule to access UsersService
        PassportModule, // Initialize Passport for authentication
      
        JwtModule.registerAsync({


            imports: [ConfigModule], // Import ConfigModule to access ConfigService
            inject: [ConfigService], // Inject ConfigService

            useFactory: async (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET_KEY');
                return {
                  secret,
                  signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
                };
              },
        }),
        
        
    ],
    controllers: [AuthController], // Register AuthController
    providers: [JwtStrategy,AuthService,JwtAuthGuard], // Register JwtStrategy as a provider
    exports:[AuthService,JwtModule]
})
export class AuthModule {}