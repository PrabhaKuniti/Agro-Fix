
export type Product = {
  id: number;
  name: string;
  pricePerUnit: number;
  unit: string;
  description: string;
  category: string;
  imageUrl?: string;
};

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';

export type OrderItem = {
  productId: number;
  quantity: number;
};

export type Order = {
  id: string;
  buyerName: string;
  contact: string;
  address: string;
  status: OrderStatus;
  createdAt: Date;
  items: OrderItem[];
  total: number;
};
