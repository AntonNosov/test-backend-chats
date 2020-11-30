import { Priority } from '../constants/priorities'

export interface SchemaToBasket {
  schemaId: number;
  priority: Priority;
}

export const SchemaToBasketOpenApi = {
  schemaId: {
    type: 'number'
  },
  priority: {
    type: 'number'
  }
}