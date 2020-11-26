import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BasketsController } from './controllers/baskets.controller'
import { Basket } from './entities/basket.entity'
import { BasketsService } from './services/baskets.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ Basket ])
  ],
  controllers: [ BasketsController ],
  providers: [ BasketsService ]
})
export class BasketsModule {
}