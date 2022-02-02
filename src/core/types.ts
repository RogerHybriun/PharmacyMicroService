export interface Pharmacy {
  id: string;
  isSubsidiaryOf?: string;
  logo: string;
  name: string;
  contactPhone: string;
  documentNumber: string;
  city: string;
  street: string;
  number: string;
  openTime: string;
  closeTime: string;
}

export type Product = {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  volume: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductList = {
  count: number;
  products: Array<Product>;
};

export type PharmacyWithProducts = Pharmacy & {
  products: Array<Product>;
};

export type PharmacyDTO = Omit<Pharmacy, "id">;

export type PharmacyList = {
  count: number;
  pharmacies: Array<Pharmacy>;
};

export type paginationOptions = {
  currentPage: number;
  pageSize: number;
};

export type Callback = (error: Error | null, result?: any) => void;
