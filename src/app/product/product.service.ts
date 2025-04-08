import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ALL_CATEGORIES,
  DEFAULT_FILTERS,
  IFiltersModel,
  SortByEnum,
} from './product-filters/product-filters.model';
import { ICategory, IProduct } from './product.model';
import { GET_CATEGORIES, GET_PRODUCTS } from './product.queries';

export const CACHE_FIRST_STRATEGY = 'cache-first';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo: Apollo = inject(Apollo);
  private allProducts = signal<IProduct[]>([]);
  private categories = signal<ICategory[]>([]);
  private filters = signal<IFiltersModel>(DEFAULT_FILTERS);

  private products = computed(() => {
    const { category, minPrice, maxPrice, sortBy } = this.filters();
    // TODO: Move the filters logic to the grapqhl query if the time allows.
    return this.allProducts()
      .filter(
        (p) =>
          (category?.toLocaleLowerCase() ===
            ALL_CATEGORIES?.toLocaleLowerCase() ||
            p.category.name?.toLowerCase() === category?.toLocaleLowerCase()) &&
          p.price >= minPrice &&
          p.price <= maxPrice
      )
      .sort((a, b) =>
        sortBy === SortByEnum.Price
          ? a.price - b.price
          : a.title.localeCompare(b.title)
      );
  });

  constructor() {
    this.apollo
      .watchQuery({ query: GET_PRODUCTS, fetchPolicy: CACHE_FIRST_STRATEGY })
      .valueChanges.subscribe((result: any) => {
        this.allProducts.set(result.data.products);
      });

    this.apollo
      .watchQuery({ query: GET_CATEGORIES, fetchPolicy: CACHE_FIRST_STRATEGY })
      .valueChanges.subscribe((result: any) => {
        this.categories.set(result.data.categories);
      });
  }

  getCategories(): Signal<ICategory[]> {
    return this.categories;
  }

  getProducts(): Signal<IProduct[]> {
    return this.products;
  }

  setFilters(updated: Partial<ReturnType<typeof this.filters>>): void {
    this.filters.update((curr) => ({ ...curr, ...updated }));
  }
}
