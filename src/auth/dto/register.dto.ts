import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";
import UserRole from "src/users/enums/RoleEnums";

export class RegisterDto{

    @IsNotEmpty({message:'the phoen number should not empty'})
    @Length(10,10,{message:'the mobile should equal to ten numbers'})
    // @Transform(({value})=>value.trime())
    mobile:number

    
    @IsString({message:'it should a string'})
    @IsNotEmpty({message:'it should not empty'})
    display_name:string

    @IsNotEmpty()
    @MaxLength(12)
    password:string
     
    
    role:UserRole

}