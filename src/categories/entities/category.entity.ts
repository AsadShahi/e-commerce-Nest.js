import { Mobile } from "src/mobiles/entities/mobile.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class Category {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToMany(()=>Product,(product)=>product.categories)
    products:Product[]



}
