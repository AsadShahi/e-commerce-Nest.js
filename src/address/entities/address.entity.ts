import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id:number


    @Column()
    province:string
    

    @Column()
    city:string

    @Column({length:10})
    postel_code:string


    @Column()
    receiver_mobile:number


    @Column({nullable:true})
    discription:string

    @ManyToOne(()=>User,(user)=>user.addresses)
    user:User
    


    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}
