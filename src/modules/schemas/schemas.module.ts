import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SchemasController } from './controllers/schemas.controller'
import { Schema } from './entities/schema.entity'
import { SchemasService } from './services/schemas.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ Schema ])
  ],
  controllers: [ SchemasController ],
  providers: [ SchemasService ]
})
export class SchemasModule {
}