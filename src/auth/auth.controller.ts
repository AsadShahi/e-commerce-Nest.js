import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import { HttpStatus } from "@nestjs/common";
@Controller('auth')

export class AuthController {


    constructor(private authService: AuthService) { }


    @Post('register')

    async register(@Body() registerdDto: RegisterDto, @Res() res: Response) {


        const register = await this.authService.register(registerdDto.name,registerdDto.mobile,  registerdDto.password, registerdDto.role)

        res.status(201).json({
            status: 201,
            data: register,
            message: 'User created successfully',
        });


    }




    @Post('login')

    async login(@Body() loginDto: LoginDto ,@Res() res:Response) {

     

       const login= await this.authService.login(loginDto.mobile, loginDto.password,res)

       res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: login,
            message: 'User login successfully',
        });
    }


}