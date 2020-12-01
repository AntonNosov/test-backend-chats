import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BallsController } from './controllers/balls.controller'
import { Ball } from './entities/ball.entity'
import { BallsService } from './services/balls.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ Ball ])
  ],
  controllers: [ BallsController ],
  providers: [ BallsService ]
})
export class BallsModule {
}