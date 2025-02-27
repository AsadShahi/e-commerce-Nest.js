import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import UserRole from "../enums/RoleEnums";

export class CreateUserDto {

    @IsOptional()
    // @IsNotEmpty({message:'the phoen number should not empty'})
    // @Length(10,10,{message:'the mobile should equal to ten numbers'})
    // // @Transform(({value})=>value.trime())
    mobile?:any

    @IsString({message:'name should a string'})
    @IsNotEmpty({message:'name should not empty'})
    name:string


    @IsNotEmpty()
    password:string;

    @IsEnum(UserRole ,{message:"is should user or admin"})
    role:UserRole


}
