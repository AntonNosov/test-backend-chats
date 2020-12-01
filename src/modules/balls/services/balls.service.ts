import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, FindManyOptions, getCustomRepository, InsertResult } from 'typeorm'
import { CreateBallDto } from '../dto/create-ball.dto'
import { Ball } from '../entities/ball.entity'
import { BallRepository } from '../repositories/ball.repository'

@Injectable()
export class BallsService {
  constructor(
    @InjectRepository(BallRepository)
    private readonly ballRepository: BallRepository
  ) {
    this.ballRepository = getCustomRepository(BallRepository)
  }

  findAll(query: FindManyOptions<Ball>): Promise<[ Ball[], number ]> {
    return this.ballRepository.findAll(query)
  }

  findById(id: number): Promise<Ball> {
    return this.ballRepository.findById(id)
  }

  create(createBallDto: CreateBallDto): Promise<InsertResult> {
    return this.ballRepository.createOne(createBallDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.ballRepository.removeOne(id)
  }
}