import { IsNumber, IsString } from "class-validator"

export class CreateNotificationDto {


    @IsString({message:'title should be a string'})
    title:string

    @IsString({message:"message should be a string"})
    message:string

    
    userId:number

}
