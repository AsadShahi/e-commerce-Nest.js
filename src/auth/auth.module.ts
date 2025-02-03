import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';



@Module({
    imports: [
        UsersModule, // Import UsersModule to access UsersService
        PassportModule, // Initialize Passport for authentication
        JwtModule.registerAsync({
            imports: [ConfigModule], // Import ConfigModule to access ConfigService
            inject: [ConfigService], // Inject ConfigService
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'), // Retrieve secret key from environment
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }, // Set token expiration
            }),
        }),
    ],
    controllers: [AuthController], // Register AuthController
    providers: [JwtStrategy,AuthService], // Register JwtStrategy as a provider
})
export class AuthModule {}