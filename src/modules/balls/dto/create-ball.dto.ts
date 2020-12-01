import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsNotEmpty, IsNotEmptyObject, Length, ValidateNested } from 'class-validator'
import { DetailOpenApi } from '../../schemas/interfaces/detail.interface'
import { CreateBallDetailDto } from './create-ball-detail.dto'

export class CreateBallDto {
  @ApiProperty({ description: 'Name of ball', required: true })
  @IsDefined()
  @Length(1, 50)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Detail of ball',
    required: true,
    type: 'object',
    properties: DetailOpenApi
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateBallDetailDto)
  detail: CreateBallDetailDto
}