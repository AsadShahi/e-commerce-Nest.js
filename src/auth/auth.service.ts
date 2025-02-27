import { Headers, Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as brcypt  from 'bcrypt'
import UserRole from "src/users/enums/RoleEnums";
import { Response } from "express";
@Injectable()
export class AuthService {
    constructor(
        private readonly userservice: UsersService,
        private readonly jwtService: JwtService

    ) { }


    async register(name: string, mobile: number, password: string, role:UserRole) {
        
        const hashedPassword:string= await brcypt.hash(password,10)
        
        return this.userservice.create({
            mobile,
            password:hashedPassword,
            name,
            role:UserRole.USER
        })

    }



    async login(mobile:number, password:string , res:Response){

        const user = await this.userservice.findByMobile(mobile)
        
        const isValidateUser=await brcypt.compare(password,user.password)
         if(!isValidateUser){
            throw new UnauthorizedException("ایمیل یا پاسورد تان اشتباه است !")
         }
        //  const role= await this.userservice
        //  make  payload 
        const role= user.role


         const payload= {mobile:user.mobile,role:role,sub:user.id, name:user.name}
        
        //  // Sign the payload to generate the JWT token
         const token:string= this.jwtService.sign(payload)


         res.cookie('access_token',token,{

            httpOnly:true,
            secure:false, //in production it will be true
            sameSite:'lax',
            maxAge:7*24*60*60*100 //7 days

         })
         
         return {
            message: 'Login successful',
           accessToken:token
          
         }


    }

}