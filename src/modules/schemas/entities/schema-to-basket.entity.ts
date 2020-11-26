import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Basket } from '../../baskets/entities/basket.entity'
import { PrioritiesEnumOpenApi, Priority } from '../constants/priorities'
import { Schema } from './schema.entity'

@Entity()
export class SchemaToBasket {
  @PrimaryColumn()
  basketId: number

  @PrimaryColumn()
  schemaId: number

  @PrimaryColumn({
    type: 'enum',
    enum: PrioritiesEnumOpenApi,
    nullable: false
  })
  priority: Priority

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @ManyToOne(
    () => Schema,
    schema => schema.schemaToBaskets
  )
  schema: Schema

  @ManyToOne(
    () => Basket,
    basket => basket.schemaToBaskets
  )
  basket: Basket
}