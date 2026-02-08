export type CartType = {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDataType;
};

export type CartDataType = {
  _id: string;
  cartOwner: string;
  products: CartProductType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
};

export type CartProductType = {
  count: number;
  _id: string;
  product: CartProductDetailsType;
  price: number;
};

type CartProductDetailsType = {
  _id: string;
  imageCover: string;
  title: string;
  ratingsAverage: number;
  quantity: number;
  category: CategoryCartProductType;
};
type CategoryCartProductType = {
  image: string;
  name: string;
  slug: string;
  _id: string;
};
