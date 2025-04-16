
import { Product, Order, OrderItem, OrderStatus } from "@/types";

// Mock product data
export const products: Product[] = [
  {
    id: 1,
    name: "Organic Carrots",
    pricePerUnit: 1.99,
    unit: "kg",
    description: "Fresh, locally grown organic carrots. Perfect for salads, roasting, or juicing.",
    category: "vegetables",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Red Apples",
    pricePerUnit: 2.49,
    unit: "kg",
    description: "Sweet and crisp red apples. Great for snacking, baking, or making fresh apple juice.",
    category: "fruits",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Roma Tomatoes",
    pricePerUnit: 3.29,
    unit: "kg",
    description: "Flavorful Roma tomatoes, perfect for sauces, salads, and sandwiches.",
    category: "vegetables",
    imageUrl: "https://images.unsplash.com/photo-1546470427-30ab5a789dd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Yellow Onions",
    pricePerUnit: 1.59,
    unit: "kg",
    description: "Versatile yellow onions, a staple for countless recipes and dishes.",
    category: "vegetables",
    imageUrl: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Ripe Bananas",
    pricePerUnit: 1.79,
    unit: "kg",
    description: "Sweet and energy-packed bananas, perfect for snacking or baking.",
    category: "fruits",
    imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Green Bell Peppers",
    pricePerUnit: 3.99,
    unit: "kg",
    description: "Crisp green bell peppers, ideal for stir-fries, salads, and stuffing.",
    category: "vegetables",
    imageUrl: "https://images.unsplash.com/photo-1596207498818-c2d98c8f31f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    name: "Russet Potatoes",
    pricePerUnit: 2.19,
    unit: "kg",
    description: "Versatile russet potatoes, perfect for baking, mashing, or making fries.",
    category: "vegetables",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    name: "Fresh Strawberries",
    pricePerUnit: 4.49,
    unit: "kg",
    description: "Sweet and juicy strawberries, great for desserts or eating fresh.",
    category: "fruits",
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  }
];

// Mock order data
export const orders: Order[] = [
  {
    id: "ORD-2023-001",
    buyerName: "Green Leaf Restaurant",
    contact: "555-123-4567",
    address: "123 Main St, Cityville, ST 12345",
    status: "DELIVERED",
    createdAt: new Date("2023-04-10T09:30:00"),
    items: [
      { productId: 1, quantity: 10 },
      { productId: 3, quantity: 5 },
      { productId: 7, quantity: 15 }
    ],
    total: 74.35
  },
  {
    id: "ORD-2023-002",
    buyerName: "Fresh Bites Catering",
    contact: "555-987-6543",
    address: "456 Oak Ave, Townsville, ST 67890",
    status: "IN_PROGRESS",
    createdAt: new Date("2023-04-15T14:45:00"),
    items: [
      { productId: 2, quantity: 8 },
      { productId: 5, quantity: 12 },
      { productId: 8, quantity: 6 }
    ],
    total: 69.31
  },
  {
    id: "ORD-2023-003",
    buyerName: "Harvest Market",
    contact: "555-456-7890",
    address: "789 Pine Rd, Villageton, ST 54321",
    status: "PENDING",
    createdAt: new Date("2023-04-16T11:15:00"),
    items: [
      { productId: 4, quantity: 20 },
      { productId: 6, quantity: 7 }
    ],
    total: 59.73
  }
];

// Helper functions
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

// For admin simulation
export let mockOrders = [...orders];

export const updateOrderStatus = (orderId: string, status: OrderStatus): boolean => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  if (orderIndex >= 0) {
    mockOrders[orderIndex] = { ...mockOrders[orderIndex], status };
    return true;
  }
  return false;
};

export const addOrder = (order: Omit<Order, 'id' | 'createdAt'>): Order => {
  const newOrder: Order = {
    ...order,
    id: `ORD-2023-${String(mockOrders.length + 1).padStart(3, '0')}`,
    createdAt: new Date(),
  };
  
  mockOrders.push(newOrder);
  return newOrder;
};
