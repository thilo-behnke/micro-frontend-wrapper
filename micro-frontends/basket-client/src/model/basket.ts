import type { Product } from "./product";

export type BasketItem = {
  product: Product;
  count: number;
};

export type Basket = {
  items: BasketItem[];
};
