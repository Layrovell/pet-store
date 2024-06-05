import { KeyValuePair } from './common';

export const ProductStatus = {
  available: 'available',
  pending: 'pending',
  sold: 'sold',
} as const;

export type StatusType = keyof typeof ProductStatus;

export type ProductAttributeNames = {
  birthDate?: string;
  breed?: string;
  color?: string;
  sex?: string;
  size?: string;
};

export type Product = {
  id: number;
  attributes: KeyValuePair;
  categoryId: number;
  createdat: Date;
  description: string;
  images: string[];
  name: string;
  price: number;
  status: StatusType;
  productAttributeNames?: ProductAttributeNames;
} & { quantity: number };

export type FilteredProductsPayload = {
  categoryId: number;
  page?: number;
  size?: number;
  filters?: any;
  sort_by?: any;
};
