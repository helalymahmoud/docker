import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from './entities/tickets.entity';

@Resolver(() => Ticket)
export class TicketResolver {
constructor(private ticketService: TicketService) {}

@Query(()=>[Ticket])
async Tickets():Promise<Ticket[]>{
  const tickets =await this.ticketService.findAll()
  return tickets || [];
}

@Query(()=>Ticket)
async Ticket(
  @Args('id')id:string):Promise<Ticket>{
    return this.ticketService.findOne(id);
  }

  @Mutation(()=>Ticket)
  async createTicket(
    @Args('createTicketInput')CreateTicketInput:CreateTicketInput):Promise<Ticket>{
      return this.ticketService.create(CreateTicketInput);

    } 

    @Mutation(()=>Ticket)
    async updateTicket(
      @Args('id')id:string,
      @Args('updateTicketInput')updateTicketInput:CreateTicketInput):Promise<Ticket>{
        return this.ticketService.update(id,updateTicketInput)
      }

      @Mutation(()=>Boolean)
      async removeTicket(
       @Args('id')id:string):Promise<boolean>{
          await this.ticketService.remove(id)
          return true
        }
        
}