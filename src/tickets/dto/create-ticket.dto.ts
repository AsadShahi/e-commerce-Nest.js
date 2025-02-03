import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateTicketDto {


    @IsNotEmpty({message:'title can not be nullable'})
    title:string

    @IsNotEmpty({message:'subject is should not null'})
    subject:string

    @IsNotEmpty({message:'user should not null'})
    userId:number

    @IsNotEmpty({message:'description should not empty'})
    description:string


    @IsOptional()
    replyTo:number


}
