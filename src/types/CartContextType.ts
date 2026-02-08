import { CartProductType, CartType } from "./CartTypes";

export type CartContextType = {
  numOfCartItem: number | null;
  setNumOfCartItem: React.Dispatch<React.SetStateAction<number | null>>;
  allProducts: CartProductType[];
  setAllProducts: React.Dispatch<React.SetStateAction<CartProductType[]>>;
  handleCart: () => Promise<CartType | undefined>;
  allProductsPrice: number | null;
};
