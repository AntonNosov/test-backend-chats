import { IsDefined, IsNotEmpty } from 'class-validator'
import { Materials, MaterialsEnumOpenApi } from '../constants/materials'

export class CreateBallDetailDto {
  @IsDefined()
  color: string

  @IsDefined()
  size: number

  @IsNotEmpty()
  material: Materials

  @IsNotEmpty()
  hollow: boolean
}

export interface Detail {
  color: string,
  size: number,
  material: Materials,
  hollow: boolean
}

export const DetailOpenApi = {
  color: {
    type: 'string'
  },
  size: {
    type: 'number'
  },
  material: {
    type: 'string',
    enum: MaterialsEnumOpenApi
  },
  hollow: {
    type: 'boolean'
  }
}