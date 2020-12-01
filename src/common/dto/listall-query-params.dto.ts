import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

export class ListAllEntities {
  @ApiProperty({ description: 'Offset of query select', default: '0', required: false })
  @IsNumberString()
  skip: number

  @ApiProperty({ description: 'Limit of query select', default: 50, required: false })
  @IsNumberString()
  take: number
}