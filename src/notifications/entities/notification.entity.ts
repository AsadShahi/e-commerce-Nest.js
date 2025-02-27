import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')

export class Notification {

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    title:string

    @Column()
    message:string

    @Column({default:false})
    isRead:boolean

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>User,(user)=>user.notifications,{onDelete:'CASCADE'})
    user:User

}
