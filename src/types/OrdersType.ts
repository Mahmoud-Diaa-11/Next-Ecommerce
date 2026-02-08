export type OrderType = {
  shippingAddress: ShippingAddressType;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: UserType;
  cartItems: CartItemType[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
};

export type ShippingAddressType = {
  details: string;
  phone: string;
  city: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type CartItemType = {
  count: number;
  _id: string;
  product: ProductType;
  price: number;
};

export type ProductType = {
  subcategory: SubcategoryType[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: CategoryType;
  brand: Brand;
  ratingsAverage: number;
  id: string;
};

export type SubcategoryType = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
