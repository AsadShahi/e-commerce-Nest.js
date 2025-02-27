import { Product } from 'src/products/entities/product.entity'; // Extend the base product entity
import { Entity, Column } from 'typeorm';

@Entity('computers') // Computer product table
export class Computer extends Product {
  @Column({ nullable: false })
  model: string;

  @Column('json', { nullable: false })
  
  specs: {
    ram: string;
    storage: string;
    processor: string;
    os: string;
    screen: string;
    graphics: string; // Unique to computer
    weight: string;
    dimensions: string;
  };
}
