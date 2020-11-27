import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator'
import { Materials } from '../constants/materials'

export class CreateSchemaDetailDto {
  @IsNotEmpty()
  color: string

  @IsNotEmpty()
  @IsNumberString()
  size: number

  @IsNotEmpty()
  @IsEnum(Materials)
  material: Materials

  @IsNotEmpty()
  @IsBoolean()
  hollow: boolean
}