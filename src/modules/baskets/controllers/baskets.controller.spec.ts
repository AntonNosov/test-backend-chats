import { Test, TestingModule } from '@nestjs/testing'
import { BasketsService } from '../services/baskets.service'
import { BasketsController } from './baskets.controller'

describe('BasketsController', () => {
  let controller: BasketsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ BasketsController ],
      providers: [ BasketsService ]
    }).compile()

    controller = module.get<BasketsController>(BasketsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})