import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('comments')

export class Comment {


    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    body: string;
  
    @Column({ default: false })
    isAccept: boolean;
  
    @Column()
    score: number;
  
    @ManyToOne(() => Product, (product) => product.comments, { onDelete: 'CASCADE' })
    product: Product;
  
    @CreateDateColumn()
    createdAt: Date;


}
