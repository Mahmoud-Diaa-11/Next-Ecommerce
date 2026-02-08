export interface Brands {
  results: number;
  metadata: Metadata;
  data: BrandsItems[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface BrandsItems {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface BrandDetails {
  data: BrandDetailsItems;
}

export interface BrandDetailsItems {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
