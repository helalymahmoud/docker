import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAdInput } from './dto/create-ad.input';
import { AdService } from './ads.service';
import { Ad } from './entities/ads.entity';

@Resolver(() => Ad)
export class AdResolver {
  constructor(private adService: AdService) {}

  @Query(()=>[Ad])
  async Ads():Promise<Ad[]>{
    const Ads =await this.adService.findAll();
    return Ads || [];
  }

 
  @Query(()=>Ad)
  async Ad(
    @Args('id')id:string):Promise<Ad>{
      return this.adService.findOne(id)
    }

    @Mutation(()=>Ad)
    async CreateAd(
      @Args('createAdInput')CreateAdInput:CreateAdInput):Promise<Ad>{
        return this.adService.create(CreateAdInput);
      }

      @Mutation(()=>Ad)
      async UpdateAd(
        @Args('id')id:string,
        @Args('updateAdInput')updateAdInput:CreateAdInput):Promise<Ad>{
          return this.adService.update(id,updateAdInput);
        }


        @Mutation(()=>Boolean)
        async removeAd(
          @Args('id')id:string):Promise<boolean>{
            await this.adService.remove(id)
            return true
          }
    
}