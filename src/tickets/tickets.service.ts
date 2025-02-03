import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {

  constructor(
    @InjectRepository(Ticket)

    private readonly ticketRepository: Repository<Ticket>,


    private readonly userService: UsersService
  ) { }


  async create(createTicketDto: CreateTicketDto) {

    const { userId, replyTo, ...ticketData } = createTicketDto

    // Fetch the user
    // Fetch the user using the correct repository
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let replyToTicket = null

    if (replyTo) {
      replyToTicket = await this.ticketRepository.findOne({where:{ id: replyTo},relations:['replyto'] })
      if(replyToTicket.replyTo){
        throw new BadRequestException('yo cant not submit ticket')
      }
    }


    const ticket = this.ticketRepository.create({ ...ticketData, user, replyto: replyToTicket })

    return this.ticketRepository.save(ticket)

  }



  async findAll() {

    const tickets= await this.ticketRepository.createQueryBuilder('tikets')
    .where('tikets.replytoId is NULL').getMany()
    return tickets
  }

  async findOne(id: number) {

   const Ticket=this.ticketRepository.findOne({where:{id},relations:['replies']})

   return Ticket
  }


  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
