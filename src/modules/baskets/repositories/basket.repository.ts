import { NotFoundException } from '@nestjs/common'
import { EntityRepository, FindManyOptions, InsertResult, Repository } from 'typeorm'
import { Basket } from '../entities/basket.entity'
import { Basket as BasketInterface } from '../interfaces/basket.interface'

@EntityRepository(Basket)
export class BasketRepository extends Repository<Basket> {
  private static updateBasket(basketRow: Basket, basket: BasketInterface): void {
    Object.keys(basketRow).forEach(field => {
      if (typeof basket[field] === 'undefined' || field === 'createdAt') return
      basketRow[field] = basket[field]
    })
    basketRow.updatedAt = new Date()
  }

  findAll(query: FindManyOptions<Basket>): Promise<[ Basket[], number ]> {
    return this.findAndCount({ ...query, order: { id: 'DESC' } })
  }

  findById(id: number): Promise<Basket> {
    return this.findOne(id)
  }

  createOne(basket: BasketInterface): Promise<InsertResult> {
    return this.insert(basket)
  }

  async updateOne(id: number, basket: BasketInterface): Promise<Basket> {
    const basketRow = await this.findOne(id)
    if (!basketRow) throw new NotFoundException('Basket is not found')
    BasketRepository.updateBasket(basketRow, basket)
    return this.save(basketRow)
  }

  async createOrUpdate(basket: BasketInterface, condition: object): Promise<Basket> {
    const basketRow = await this.findOne(condition)
    if (!basketRow) return this.save(basket)
    BasketRepository.updateBasket(basketRow, basket)
    return this.save(basketRow)
  }
}