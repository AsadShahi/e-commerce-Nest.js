import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAccessoryDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsString({ message: 'Model must be a string' })
    @IsNotEmpty({ message: 'Model is required' })
    model: string;


    @IsString({ message: 'type must be a string' })
    @IsNotEmpty({ message: 'type is required' })
    type:string


    @IsString({ message: 'Brand must be a string' })
    @IsNotEmpty({ message: 'Brand is required' })
    brand: string;

    @IsString({ message: 'Short description must be a string' })
    @IsNotEmpty({ message: 'Short description is required' })
    short_description: string;

    @IsString({ message: 'Long description must be a string' })
    @IsOptional()
    long_description?: string;


    // @IsNumber({}, { message: 'Price must be a number' })
    @IsNotEmpty({ message: 'Price is required' })
    price: any;

    // @IsInt({ message: 'Stock must be an integer' })
    @IsNotEmpty({ message: 'Stock is required' })
    stock: any;

    @IsArray({ message: 'Category IDs must be an array' })
    @IsOptional()
    @IsInt({ each: true, message: 'Each category ID must be an integer' })
    categoryIds?: number[];


    images: string[];


}
