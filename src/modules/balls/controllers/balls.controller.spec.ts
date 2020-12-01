import { Test, TestingModule } from '@nestjs/testing'
import { BallsService } from '../services/balls.service'
import { BallsController } from './balls.controller'

describe('BallsController', () => {
  let controller: BallsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ BallsController ],
      providers: [ BallsService ]
    }).compile()

    controller = module.get<BallsController>(BallsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})