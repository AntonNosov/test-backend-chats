import { NotFoundException } from '@nestjs/common'
import { DeleteResult, EntityRepository, FindManyOptions, InsertResult, Repository } from 'typeorm'
import { Ball } from '../entities/ball.entity'
import { Ball as BallInterface } from '../interfaces/ball.interface'

@EntityRepository(Ball)
export class BallRepository extends Repository<Ball> {
  private static updateBall(ballRow: Ball, ball: BallInterface): void {
    Object.keys(ballRow).forEach(field => {
      if (typeof ball[field] === 'undefined' || field === 'createdAt') return
      ballRow[field] = ball[field]
    })
    ballRow.updatedAt = new Date()
  }

  findAll(query: FindManyOptions<Ball>): Promise<[ Ball[], number ]> {
    return this.findAndCount({ ...query, order: { id: 'DESC' } })
  }

  findById(id: number): Promise<Ball> {
    return this.findOne(id)
  }

  createOne(ball: BallInterface): Promise<InsertResult> {
    return this.insert(ball)
  }

  async updateOne(id: number, ball: BallInterface): Promise<Ball> {
    const ballRow = await this.findOne(id)
    if (!ballRow) throw new NotFoundException('Ball is not found')
    BallRepository.updateBall(ballRow, ball)
    return this.save(ballRow)
  }

  async createOrUpdate(ball: BallInterface, condition: object): Promise<Ball> {
    const ballRow = await this.findOne(condition)
    if (!ballRow) return this.save(ball)
    BallRepository.updateBall(ballRow, ball)
    return this.save(ballRow)
  }

  removeOne(id: number): Promise<DeleteResult> {
    return this.delete(id)
  }
}