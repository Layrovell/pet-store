import { KeyValuePair } from './common';

export const ProductStatus = {
  available: 'available',
  pending: 'pending',
  sold: 'sold',
} as const;

export type StatusType = keyof typeof ProductStatus;

export interface Product {
  id: number;
  attributes: KeyValuePair;
  categoryId: number;
  createdat: Date;
  description: string;
  images: string[];
  name: string;
  price: number;
  status: StatusType;
}

export type FilteredProductsPayload = {
  categoryId: number;
  page?: number;
  size?: number;
  filters?: any;
};
