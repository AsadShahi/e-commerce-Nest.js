import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";

@Entity('accessories')
export class Accessory {
  @PrimaryGeneratedColumn({ name: "id" }) // Ensure accessory has its own ID column
  id: number;

  @ManyToOne(() => Product, (product) => product.accessories)
  @JoinColumn({ name: 'product_id' })
  baseProduct: Product;


  @Column()
  type: string
  
  @Column('simple-json', { nullable: false })
  images: string[];

}
