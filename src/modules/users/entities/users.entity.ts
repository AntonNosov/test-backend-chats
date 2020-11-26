import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { Ball } from '../../balls/entities/ball.entity'
import { Roles } from '../constants/Roles'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  firstName: string

  @Column({ type: 'varchar', length: 50 })
  lastName: string

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Unique([ 'email' ])
  email: string

  @Column({ length: 50, nullable: true })
  @Unique([ 'login' ])
  login: string

  @Column({ nullable: true, select: false })
  passwordHash: string

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER
  })
  role: Roles

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @OneToMany(
    () => Ball,
    ball => ball.user
  )
  balls: Ball[]
}