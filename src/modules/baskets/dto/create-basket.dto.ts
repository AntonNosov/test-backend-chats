import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, Length } from 'class-validator'

export class CreateBasketDto {
  @ApiProperty({ description: 'Name of basket', required: true })
  @Length(1, 50)
  @IsDefined()
  name: string

  @ApiProperty({ description: 'Schema to basket', required: true })
  @IsDefined()
  schemas: object[]
}