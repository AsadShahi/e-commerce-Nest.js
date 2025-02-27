import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString({message:"title is string"})
    name: string

    @IsString()
    brand:string

    @IsString()
    short_description: string

    @IsOptional()
    long_description:string

    @IsInt()
    price: number


    @IsInt()
    stock: number

    @IsOptional()
    @IsArray()
    categoryIds?: number[]


    images:string[]

}
