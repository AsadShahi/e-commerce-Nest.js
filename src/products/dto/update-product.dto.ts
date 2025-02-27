
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    brand:string
    
    @IsOptional()
    short_description:string
    
    @IsOptional()
    long_description:string

    @IsOptional()
    @IsInt()
    price:number

    @IsOptional()
    @IsInt()
    stock:number
    

    @IsOptional()
    @IsArray()
    categoryIds?:number[]

    @IsOptional()
    images:string[]

}
