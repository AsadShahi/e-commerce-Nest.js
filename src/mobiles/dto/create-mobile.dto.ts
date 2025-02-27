import { IsArray, IsInt, IsOptional, IsString, IsNotEmpty, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class SpecsDto {
  @IsString({ message: 'RAM must be a string' })
  @IsNotEmpty({ message: 'RAM is required' })
  ram: string;

  @IsString({ message: 'Storage must be a string' })
  @IsNotEmpty({ message: 'Storage is required' })
  storage: string;

  @IsString({ message: 'Camera must be a string' })
  @IsNotEmpty({ message: 'Camera is required' })
  camera: string;

  @IsString({ message: 'Battery must be a string' })
  @IsNotEmpty({ message: 'Battery is required' })
  battery: string;

  @IsString({ message: 'Screen must be a string' })
  @IsNotEmpty({ message: 'Screen is required' })
  screen: string;

  @IsString({ message: 'Processor must be a string' })
  @IsNotEmpty({ message: 'Processor is required' })
  processor: string;

  @IsString({ message: 'OS must be a string' })
  @IsNotEmpty({ message: 'OS is required' })
  os: string;

  @IsString({ message: 'SIM must be a string' })
  @IsNotEmpty({ message: 'SIM is required' })
  sim: string;

  @IsString({ message: 'Weight must be a string' })
  @IsNotEmpty({ message: 'Weight is required' })
  weight: string;

  @IsString({ message: 'Dimensions must be a string' })
  @IsNotEmpty({ message: 'Dimensions is required' })
  dimensions: string;

  @IsString({ message: 'Network must be a string' })
  @IsNotEmpty({ message: 'Network is required' })
  network: string;

  @IsString({ message: 'Color must be a string' })
  @IsNotEmpty({ message: 'Color is required' })
  color: string;
}

export class CreateMobileDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Model must be a string' })
  @IsNotEmpty({ message: 'Model is required' })
  model: string;

  @IsString({ message: 'Brand must be a string' })
  @IsNotEmpty({ message: 'Brand is required' })
  brand: string;

  @IsString({ message: 'Short description must be a string' })
  @IsNotEmpty({ message: 'Short description is required' })
  short_description: string;

  @IsString({ message: 'Long description must be a string' })
  @IsOptional()
  long_description?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  @Type(() => Number)
  price: number;

  @IsInt({ message: 'Stock must be an integer' })
  @IsNotEmpty({ message: 'Stock is required' })
  @Type(() => Number)
  stock: number;

  @IsArray({ message: 'Category IDs must be an array' })
  @IsOptional()
  @IsInt({ each: true, message: 'Each category ID must be an integer' })
  @Type(() => Number)
  categoryIds?: number[];

  @IsObject({ message: 'Specs must be an object' })
  @ValidateNested()
  @Type(() => SpecsDto)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value); // Parse stringified JSON
      } catch (error) {
        throw new Error('Invalid specs format');
      }
    }
    return value;
    
  })

  @IsOptional()
  productId:any
  specs: SpecsDto;

  images: string[];

}