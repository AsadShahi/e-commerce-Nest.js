import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('address')
export class AddressController {

  constructor(private readonly addressService: AddressService) { }

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto, @Res() res: Response) {
 
    const address = await this.addressService.create(createAddressDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: address,
      message: 'address created succsessfully'


    })
  }


  @Get()
  @ApiOperation({summary:"get all address"})
  @ApiResponse({status:200, description:"return all address"})
  
 async findAll(@Res() res: Response) {

    const allAdress =await this.addressService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: allAdress,
      message: 'find all address succsessfully'


    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const address =await this.addressService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: address,
      message: 'address find by id'
    })
  }

   @Put(':id')
   async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const address = await this.addressService.remove(+id);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: address,
      message: 'this addresss successfully deleted'
    })
  }
}
