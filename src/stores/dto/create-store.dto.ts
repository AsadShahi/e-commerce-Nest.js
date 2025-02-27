import { IsNumber, IsString } from "class-validator";

export class CreateStoreDto {

 
  
    @IsString()
    name: string;
  
    
    logo: any;
  
    @IsString()
    description: string;
  
    
    sellerId: any;


}
