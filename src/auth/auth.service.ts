import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as brcypt  from 'bcrypt'
import UserRole from "src/users/enums/RoleEnums";
@Injectable()
export class AuthService {
    constructor(
        private readonly userservice: UsersService,
        private readonly jwtService: JwtService

    ) { }


    async register(display_name: string, mobile: number, password: string, role:UserRole) {
        
        const hashedPassword:string= await brcypt.hash(password,10)
        
        return this.userservice.create({
            mobile,
            password:hashedPassword,
            display_name,
            role:UserRole.USER
        })
    }



    async login(mobile:number, password:string){
        const user = await this.userservice.findByMobile(mobile)

        const isValidateUser=await brcypt.compare(password,user.password)
         if(!isValidateUser){
            throw new UnauthorizedException("youar not authorized")
         }

        //  make  payload 
         const payload= {mobile:user.mobile,sub:user.id, name:user.display_name}

        //  // Sign the payload to generate the JWT token
         const token:string= this.jwtService.sign(payload)

         return{
            accessToken:token
         }


    }

}