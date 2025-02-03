import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserRole from "../enums/RoleEnums";
import { Address } from "src/address/entities/address.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    mobile:number

    @Column({nullable:false})
    display_name:string

    @Column()
    password:string
    
    @Column({type:'enum',enum:UserRole ,default:UserRole.USER })
    role:UserRole

    @OneToMany(()=>Address,(address)=>address.user)
    addresses:Address

    @OneToMany(()=>Ticket, (ticket)=>ticket.user)
    tickets:Ticket[]


    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date


}
