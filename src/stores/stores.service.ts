import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { find } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { error, log } from 'console';

@Injectable()
export class StoresService {


  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

  ) {}

  async create(createStoreDto: CreateStoreDto) {
  
    const {sellerId,logo, ...data}=createStoreDto

    const seller = await this.UserRepository.findOne({where:{id:sellerId}})
    
      if(!seller){
        throw new NotFoundException('not found user or seller ')
      }

     const existStore = await this.storeRepository.findOne({where:{name:createStoreDto.name,seller:sellerId}})

     if(existStore){
       throw new  NotFoundException('شما  قبلا یک فروشگاه ثبت کردین..')
     }

    const store  =  this.storeRepository.create({
        ...data,
        seller,
        logo: `http://localhost:5000/public/uploads/logo/${logo.filename}`, 
    })

    return await this.storeRepository.save(store)
  }



  async findAll() {
    return await this.storeRepository.find()
  }

  async findOne(id: number) {
    return await this.storeRepository.findOne({
      where: { id },
      relations: ["seller"], 
    });
  }



  
  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const result = await this.storeRepository.update(id, updateStoreDto);
    if (result.affected === 0) {
      throw new Error('Store not found or nothing to update');
    }
    return this.storeRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
