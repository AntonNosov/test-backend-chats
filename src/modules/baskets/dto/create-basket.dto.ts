import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsDefined, Length, ValidateNested } from 'class-validator'
import { CreateSchemaToBasketDto } from '../../schemas/dto/create-schema-to-basket.dto'
import { SchemaToBasketOpenApi } from '../../schemas/interfaces/schema-to-basket.interface'

export class CreateBasketDto {
  @ApiProperty({ description: 'Name of basket', required: true })
  @Length(1, 50)
  @IsDefined()
  name: string

  @ApiProperty({
    description: 'Schema to basket',
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: SchemaToBasketOpenApi
    }
  })
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateSchemaToBasketDto)
  schemasToBasket: CreateSchemaToBasketDto[]
}