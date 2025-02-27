import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enum/OrderEnumStatus';
export class CreateOrderDto {


  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  notes?: string;

  

  userId:number

}
