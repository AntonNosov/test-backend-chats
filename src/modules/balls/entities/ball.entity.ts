import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Basket } from '../../baskets/entities/basket.entity'
import { Detail } from '../../schemas/interfaces/detail.interface'
import { User } from '../../users/entities/users.entity'

@Entity()
export class Ball {
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

  @ManyToOne(
    () => Basket,
    basket => basket.balls
  )
  @JoinTable()
  basket: Basket

  @ManyToOne(
    () => User,
    user => user.balls
  )
  @JoinTable()
  user: User
}