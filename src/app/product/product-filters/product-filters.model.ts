export interface IFiltersModel {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: SortByEnum;
}

export enum SortByEnum {
  Price = 'price',
  Name = 'name',
}

export const ALL_CATEGORIES: string = 'all';

export const DEFAULT_FILTERS: IFiltersModel = {
  category: ALL_CATEGORIES,
  minPrice: 0,
  maxPrice: 10000,
  sortBy: SortByEnum.Price,
};
