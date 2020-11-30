import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator'
import { Materials } from '../constants/materials'

export class CreateSchemaDetailDto {
  @IsNotEmpty()
  color: string

  @IsNotEmpty()
  @IsNumber()
  size: number

  @IsNotEmpty()
  @IsEnum(Materials)
  material: Materials

  @IsNotEmpty()
  @IsBoolean()
  hollow: boolean
}