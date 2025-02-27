import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enum/OrderEnumStatus";


@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    notes?: string;


    @Column({ type:"enum",enum:OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;


    @ManyToOne(() => User, (order) => order.orders)
    user: User


}