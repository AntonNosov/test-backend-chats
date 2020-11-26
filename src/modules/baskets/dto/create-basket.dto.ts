import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateBasketDto {
  @ApiProperty({ description: 'Name of basket', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  name: string
}