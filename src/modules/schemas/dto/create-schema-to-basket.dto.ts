import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator'
import { PrioritiesEnumOpenApi, Priority } from '../constants/priorities'

export class CreateSchemaToBasketDto {
  @ApiProperty({ description: 'Id of schema', required: true })
  @IsDefined()
  @IsNotEmpty()
  schemaId: number

  @ApiProperty({ description: 'Priority of baskets schema', required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PrioritiesEnumOpenApi)
  priority: Priority
}