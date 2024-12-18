import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PartnerService } from './partner.service';
import { CreatePartnerInput } from './dto/create-partner.input';
import { Partner } from './entites/Partner.entity';

@Resolver(() => Partner)export class PartnerResolver {
  constructor(private partnerService: PartnerService) 
  {}


  @Query(()=>[Partner])
  async Partners():Promise<Partner[]>{
    const partner = await this.partnerService.findAll();
    return partner || [];
  }

  @Query(()=>Partner)
  async Partner(
    @Args('id')id:string):Promise<Partner>{
      return this.partnerService.findOne(id)
    }

    @Mutation(()=>Partner)
    async createPartner(
      @Args('createPartnerInput')CreatePartnerInput:CreatePartnerInput):Promise<Partner>{
        return this.partnerService.create(CreatePartnerInput);

      }

      @Mutation(()=>Partner)
      async updatePartner(
        @Args('id')id:string,
        @Args('updatePartnerInput')updatePartnerInput:CreatePartnerInput):Promise<Partner>{
          return this.partnerService.update(id,updatePartnerInput)
        }

        @Mutation(()=>Boolean)
        async removePartner(
          @Args('id')id:string):Promise<boolean>{
            await this.partnerService.remove(id);
            return true
          }
          
}