export interface ICategory {
  name: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  category: ICategory;
  images: string[];
}
