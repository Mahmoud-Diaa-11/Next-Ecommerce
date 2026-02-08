export interface Categories {
  results: number;
  metadata: Metadata;
  data: CategoriesItems[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesItems {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface CategoryDetails {
  data: CategoryDetailsItems;
}

export interface CategoryDetailsItems {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
