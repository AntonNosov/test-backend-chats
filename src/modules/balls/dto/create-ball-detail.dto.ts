import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from 'class-validator'
import { Materials } from '../../schemas/constants/materials'

export class CreateBallDetailDto {
  @IsNotEmpty()
  color: string

  @IsNotEmpty()
  @IsInt()
  size: number

  @IsNotEmpty()
  @IsEnum(Materials)
  material: Materials

  @IsNotEmpty()
  @IsBoolean()
  hollow: boolean
}