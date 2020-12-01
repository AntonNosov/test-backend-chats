import { SchemaToBasket } from '../../schemas/interfaces/schema-to-basket.interface'

export interface Basket {
  id?: number;
  name?: string;
  schemasToBasket?: SchemaToBasket[];
}