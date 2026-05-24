export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userEmail: string;
  shippingDetails: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string | Date; 
}