import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsNotEmpty, Length, ValidateNested } from 'class-validator'
import { CreateBallDetailDto, DetailOpenApi } from '../../schemas/interfaces/detail.interface'

export class CreateBallDto {
  @ApiProperty({ description: 'Name of ball', required: true })
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
  @ValidateNested()
  @Type(() => CreateBallDetailDto)
  detail: CreateBallDetailDto
}