import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, getCustomRepository, InsertResult } from 'typeorm'
import { CreateSchemaDto } from '../dto/create-schema.dto'
import { UpdateSchemaDto } from '../dto/update-schema.dto'
import { Schema } from '../entities/schema.entity'
import { SchemaRepository } from '../repositories/schema.repository'

@Injectable()
export class SchemasService {
  constructor(
    @InjectRepository(SchemaRepository)
    private readonly schemaRepository: SchemaRepository
  ) {
    this.schemaRepository = getCustomRepository(SchemaRepository)
  }

  findAll(query: FindManyOptions<Schema>): Promise<[ Schema[], number ]> {
    return this.schemaRepository.findAll(query)
  }

  findById(id: number): Promise<Schema> {
    return this.schemaRepository.findById(id)
  }

  create(createSchemaDto: CreateSchemaDto): Promise<InsertResult> {
    return this.schemaRepository.createOne(createSchemaDto)
  }

  update(id: number, updateSchemaDto: UpdateSchemaDto): Promise<Schema> {
    return this.schemaRepository.updateOne(id, updateSchemaDto)
  }
}