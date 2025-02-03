import { IsNotEmpty, Length, MaxLength, maxLength } from "class-validator"

export class LoginDto {
    @IsNotEmpty({message:'the phoen number should not empty'})
    @Length(10,10,{message:'the mobile should equal to ten numbers'})
    // @Transform(({value})=>value.trime())
    mobile:number

    
    
    @IsNotEmpty()
    @MaxLength(12)
    password:string
}