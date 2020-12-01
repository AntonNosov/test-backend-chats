import { NotFoundException } from '@nestjs/common'
import { EntityRepository, FindManyOptions, InsertResult, Repository } from 'typeorm'
import { Schema } from '../entities/schema.entity'
import { Schema as SchemaInterface } from '../interfaces/schema.interface'

@EntityRepository(Schema)
export class SchemaRepository extends Repository<Schema> {
  private static updateSchema(schemaRow: Schema, user: SchemaInterface): void {
    Object.keys(schemaRow).forEach(field => {
      if (typeof user[field] === 'undefined' || field === 'createdAt') return
      schemaRow[field] = user[field]
    })
    schemaRow.updatedAt = new Date()
  }

  findAll(query: FindManyOptions<Schema>): Promise<[ Schema[], number ]> {
    return this.findAndCount({ ...query, order: { id: 'DESC' } })
  }

  findById(id: number): Promise<Schema> {
    return this.findOne(id)
  }

  createOne(schema: SchemaInterface): Promise<InsertResult> {
    return this.insert(schema)
  }

  async updateOne(id: number, schema: SchemaInterface): Promise<Schema> {
    const schemaRow = await this.findOne(id)
    if (!schemaRow) throw new NotFoundException('Schema is not found')
    SchemaRepository.updateSchema(schemaRow, schema)
    return this.save(schemaRow)
  }

  async createOrUpdate(schema: SchemaInterface, condition: object): Promise<Schema> {
    const schemaRow = await this.findOne(condition)
    if (!schemaRow) return this.save(schema)
    SchemaRepository.updateSchema(schemaRow, schema)
    return this.save(schemaRow)
  }
}