import { Test, TestingModule } from '@nestjs/testing'
import { BallsService } from './balls.service'

describe('BallsService', () => {
  let service: BallsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ BallsService ]
    }).compile()

    service = module.get<BallsService>(BallsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})