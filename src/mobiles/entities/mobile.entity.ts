import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mobiles') // Mobile product table
export class Mobile {
  
   @PrimaryGeneratedColumn()
   id:number

   @ManyToOne(()=>Product,(product)=>product.mobiles)
   @JoinColumn({name:"product_id"})
   baseProduct:Product;

   
   @Column('simple-json', { nullable: false })
   images: string[];
   
  @Column('json', { nullable: false })
  specs: {
    ram: string;
    storage: string;
    camera: string;
    battery: string;
    screen: string;
    processor: string;
    os: string;
    sim: string; // Unique to mobile
    weight: string;
    dimensions: string;
    network: string;
    color: string;
  };
}
