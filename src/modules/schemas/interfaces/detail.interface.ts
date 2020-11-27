import { Materials, MaterialsEnumOpenApi } from '../constants/materials'

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