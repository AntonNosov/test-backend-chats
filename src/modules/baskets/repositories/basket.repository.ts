import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { EntityRepository, FindManyOptions, getConnection, Repository } from 'typeorm'
import { SchemaToBasket } from '../../schemas/entities/schema-to-basket.entity'
import { SchemaToBasket as SchemaToBasketInterface } from '../../schemas/interfaces/schema-to-basket.interface'
import { Basket } from '../entities/basket.entity'
import { Basket as BasketInterface } from '../interfaces/basket.interface'

@EntityRepository(Basket)
export class BasketRepository extends Repository<Basket> {
  findAll(query: FindManyOptions<Basket>): Promise<[ Basket[], number ]> {
    return this.findAndCount({ ...query, order: { id: 'DESC' } })
  }

  findById(id: number): Promise<Basket> {
    return this.findOne(id)
  }

  async createOne(basket: BasketInterface): Promise<Basket> {
    let basketRow = this.create(basket)
    await getConnection().transaction(async transactionalEntityManager => {
      basketRow = await transactionalEntityManager.save(basketRow)
      await Promise.all(basket.schemasToBasket.map((schemaToBasket: SchemaToBasketInterface) => {
        const schemaRow = new SchemaToBasket()
        Object.keys(schemaToBasket).forEach(field => (schemaRow[field] = schemaToBasket[field]))
        schemaRow.basketId = basketRow.id
        return transactionalEntityManager.save(schemaRow)
      }))
    })
    if (!basketRow.id) throw new InternalServerErrorException('Basket is not created')
    return this.findOne(basketRow.id, { relations: [ 'schemasToBaskets' ] })
  }

  async updateOne(id: number, basket: BasketInterface): Promise<Basket> {
    const basketRow = await this.findOne(id, { relations: [ 'schemasToBasket' ] })
    if (!basketRow) throw new NotFoundException('Basket is not found')
    Object.keys(basketRow).forEach(field => {
      if (typeof basket[field] === 'undefined' || field === 'createdAt') return
      field === 'schemasToBasket'
        ? basketRow[field] = basket[field].map(schemaToBasket => ({ basketId: basketRow.id, ...schemaToBasket }))
        : basketRow[field] = basket[field]
    })
    basketRow.updatedAt = new Date()
    console.log(basketRow)
    return this.save(basketRow)
  }
}