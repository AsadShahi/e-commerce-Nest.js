import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('stores')
export class Store {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @Column({ nullable: true })
    logo: string;
  
    @Column("text")
    description: string;
  
    @ManyToOne(() => User, (user) => user.store, { onDelete: "CASCADE" })
    seller: User;
  
    @CreateDateColumn()
    createdAt: Date;


}
