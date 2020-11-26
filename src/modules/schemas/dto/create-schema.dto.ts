import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'
import { Detail, DetailOpenApi } from '../interfaces/detail.interface'

export class CreateSchemaDto {
  @ApiProperty({ description: 'Name of schema', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Detail of schema',
    required: true,
    type: 'object',
    properties: DetailOpenApi
  })
  @IsNotEmpty()
  detail: Detail
}