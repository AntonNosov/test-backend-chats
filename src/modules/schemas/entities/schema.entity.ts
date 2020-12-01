import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Detail } from '../interfaces/detail.interface'
import { SchemaToBasket } from './schema-to-basket.entity'

@Entity()
export class Schema {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false
  })
  detail: Detail

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @OneToMany(
    () => SchemaToBasket,
    schemaToBasket => schemaToBasket.schema
  )
  schemasToBasket: SchemaToBasket[]
}