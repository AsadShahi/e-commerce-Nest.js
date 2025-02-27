import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, TableInheritance, OneToMany, JoinColumn } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Mobile } from 'src/mobiles/entities/mobile.entity';
import { Accessory } from 'src/accessories/entities/accessory.entity';
import { ProductType } from '../enum/ProductEnumTypes';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
@Entity('products')


export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  model: string;

  
  @Column({ nullable: false })
  brand: string;

  

  @Column({ nullable: false })
  short_description: string;

  @Column({ nullable: true })
  long_description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({type:'enum',enum:ProductType,default:ProductType.MOBILE})
 
  Product_type: ProductType; // Distinguishes entity types

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  
  // @JoinTable({
  //   name: 'product_category',
  //   joinColumn: { name: 'product_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  // })
  categories: Category[];

  @OneToMany(()=>Comment,(comment)=>comment.product)
  comments:Comment[]

  @OneToMany(()=>Mobile,(mobile)=>mobile.baseProduct)
  mobiles:Mobile[]

  @OneToMany(()=>Accessory,(accessory)=>accessory.baseProduct)
  accessories:Accessory[]

  @OneToMany(()=>Wishlist,(wishlist)=>wishlist.product)
  wishlist:Wishlist[]

}
