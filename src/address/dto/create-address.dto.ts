import { IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";
import { Column } from "typeorm";

export class CreateAddressDto {


    @IsNotEmpty()
    userId: number
    
    @IsNotEmpty({ message: 'receiver mobile should not empty' })
    receiver_mobile: number

    @IsNotEmpty({ message: 'province should not empty' })
    province: string



    @IsNotEmpty({ message: 'city should not empty' })
    city: string

    @IsNotEmpty({ message: 'postel code should not empty' })
    postel_code: string

    @IsNotEmpty({ message: 'address should not empty' })
    address: string

    

    @IsOptional()
    discription: string
}
