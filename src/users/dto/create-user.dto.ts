import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import UserRole from "../enums/RoleEnums";

export class CreateUserDto {

    @IsNotEmpty({message:'the phoen number should not empty'})
    @Length(10,10,{message:'the mobile should equal to ten numbers'})
    // @Transform(({value})=>value.trime())
    mobile:number

    @IsString({message:'display_name should a string'})
    @IsNotEmpty({message:'display_name should not empty'})
    display_name:string


    @IsNotEmpty()
    password:string;

    @IsEnum(UserRole ,{message:"is should user or admin"})
    role:UserRole


}
