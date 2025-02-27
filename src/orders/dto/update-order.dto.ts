import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../enum/OrderEnumStatus';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {


    @IsEnum({message:'this should be enum status'})
    status:OrderStatus

}
