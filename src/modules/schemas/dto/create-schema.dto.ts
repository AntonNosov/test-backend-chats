import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsNotEmpty, IsNotEmptyObject, Length, ValidateNested } from 'class-validator'
import { DetailOpenApi } from '../interfaces/detail.interface'
import { CreateSchemaDetailDto } from './create-schema-detail.dto'

export class CreateSchemaDto {
  @ApiProperty({ description: 'Name of schema', required: true })
  @IsDefined()
  @Length(1, 50)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Detail of schema',
    required: true,
    type: 'object',
    properties: DetailOpenApi
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateSchemaDetailDto)
  detail: CreateSchemaDetailDto
}