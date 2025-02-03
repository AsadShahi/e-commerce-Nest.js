import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createAddressDto: CreateAddressDto) {
    
    
    const { userId, ...addressData } = createAddressDto
   
    const user = await this.userRepository.findOneByOrFail({ id: userId })
    const address = this.addressRepository.create({ ...addressData, user })

    return this.addressRepository.save(address)

  }


  async findAll() {

    const address = await this.addressRepository.find({ relations: ['user'] });

    return address
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOne({ where: { id }, relations: ['user'] })
    return address
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {


    const findAddress = await this.findOne(id)
    if (!findAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    await this.addressRepository.update(id, updateAddressDto)
    const updateAddress = this.findOne(id)
    return updateAddress
  }

  remove(id: number) {
    const address = this.addressRepository.delete(id)
  }
}
