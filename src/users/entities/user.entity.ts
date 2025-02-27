import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserRole from "../enums/RoleEnums";
import { Address } from "src/address/entities/address.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Story } from "src/stories/entities/story.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import {Order} from 'src/orders/entities/order.entity'
import { Store } from "src/stores/entities/store.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,nullable:true})
    mobile:number

    @Column({nullable:false})
    name:string

    @Column()
    password:string
    
    @Column({type:'enum',enum:UserRole ,default:UserRole.CUSTOMER })
    role:UserRole

    @OneToMany(()=>Address,(address)=>address.user)
    addresses:Address


    @OneToMany(()=>Ticket, (ticket)=>ticket.user)
    tickets:Ticket[]


    @OneToMany(()=>Story,(story)=>story.seller)
    stories:Story[]

    @OneToOne(()=>Store,(store)=>store.seller)
    store:Store
    
    @OneToMany(()=>Notification,(notfication)=>notfication.user)
    notifications:Notification[]


    @OneToMany(()=>Order,(order)=>order.user)
     orders:Order[]
   

     @OneToMany(()=>Wishlist,(wishlist)=>wishlist.user)
     wishlist:Wishlist[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date


}
