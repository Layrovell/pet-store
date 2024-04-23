export const ProductStatus = {
  available: 'available',
  pending: 'pending',
  sold: 'sold',
} as const;

export type StatusType = keyof typeof ProductStatus;

export interface Product {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags: [
    {
      id: number;
      name: string;
    }
  ];
  status: StatusType;
}
