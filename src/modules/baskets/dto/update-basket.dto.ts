import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'
import { CreateBasketDto } from './create-basket.dto'

export class UpdateBasketDto extends PartialType(CreateBasketDto) {
  @ApiProperty({ description: 'Name of basket', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  name: string
}