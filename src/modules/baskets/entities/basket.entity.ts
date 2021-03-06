import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Ball } from '../../balls/entities/ball.entity'
import { SchemaToBasket } from '../../schemas/entities/schema-to-basket.entity'

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @OneToMany(
    () => SchemaToBasket,
    schemaToBasket => schemaToBasket.basket
  )
  @JoinTable()
  schemasToBasket: SchemaToBasket[]

  @OneToMany(
    () => Ball,
    ball => ball.basket
  )
  @JoinTable()
  balls: Ball[]
}