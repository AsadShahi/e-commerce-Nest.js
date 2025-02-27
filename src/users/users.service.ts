import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {


  constructor
    (@InjectRepository(User)
    private readonly userRepository: Repository<User>) { }



  async create(createUserDto: CreateUserDto) {


    // Await the result to ensure it returns the user (if exists)
    const isExistUser = await this.findByMobile(createUserDto.mobile);

    
    if (isExistUser) {
      throw new BadRequestException('این شماره تلفن قبلا در سیستم موجود است. ');
    }

    
    const user = this.userRepository.create({...createUserDto})
    
    
    return await this.userRepository.save(user)
  }


  findAll() {
    const users = this.userRepository.find()

    return users;
  }

  async findOne(id: number) {
    const user= await this.userRepository.findOne({where:{id}})
    return user;
  }

  // async findByRole(mobile: number): Promise<User | undefined> {
  //   // Assuming you are querying the database to check if the mobile exists
  //   return await this.userRepository.findOne({ where: { mobile } });
  // }


  async findByMobile(mobile: number): Promise<User | undefined> {
    // Assuming you are querying the database to check if the mobile exists
    return await this.userRepository.findOne({ where: { mobile } });
  }

  
  async update(id: number, updateUserDto: UpdateUserDto) {

    console.log(id,'==',updateUserDto)
    const user= await this.userRepository.update(id,{...updateUserDto})

    return user
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
