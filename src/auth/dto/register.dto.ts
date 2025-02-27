import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, Min, MinLength } from "class-validator";
import UserRole from "src/users/enums/RoleEnums";

export class RegisterDto{


    @IsOptional()
    @IsString()
    @IsNotEmpty({message:'شماره تلفن نباید خالی باشد'})
    // @MinLength(10,{message:'شماره تلفن حداقل ده عدد و حد اکثر 12 عدد باشد'})

    // @MaxLength(10,{message:'شماره تلفن حداقل ده عدد و حد اکثر 12 عدد باشد'})
    mobile?: any;
    

    @IsString({message:'it should a string'})
    @IsNotEmpty({message:'it should not empty'})
    name:string

    @IsNotEmpty()
    @MaxLength(12)
    password:string
     
    role:UserRole

}