import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, getCustomRepository, InsertResult } from 'typeorm'
import { CreateBasketDto } from '../dto/create-basket.dto'
import { UpdateBasketDto } from '../dto/update-basket.dto'
import { Basket } from '../entities/basket.entity'
import { BasketRepository } from '../repositories/basket.repository'

@Injectable()
export class BasketsService {
  constructor(
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository
  ) {
    this.basketRepository = getCustomRepository(BasketRepository)
  }

  findAll(query: FindManyOptions<Basket>): Promise<[ Basket[], number ]> {
    return this.basketRepository.findAll(query)
  }

  findById(id: number): Promise<Basket> {
    return this.basketRepository.findById(id)
  }

  create(createBasketDto: CreateBasketDto): Promise<InsertResult> {
    return this.basketRepository.createOne(createBasketDto)
  }

  update(id: number, updateBasketDto: UpdateBasketDto): Promise<Basket> {
    return this.basketRepository.updateOne(id, updateBasketDto)
  }
}