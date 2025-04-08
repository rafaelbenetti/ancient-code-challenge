import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { GET_PRODUCTS } from '../product.queries';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductFiltersComponent],
  templateUrl: './products.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  apollo: Apollo = inject(Apollo);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);
  wishlist = signal<string[]>(this.getStoredWishlist());
  wishlistCount = computed(() => this.wishlist().length);

  constructor() {
    this.apollo
      .watchQuery({ query: GET_PRODUCTS })
      .valueChanges.subscribe((result: any) => {
        this.products.set(result?.data?.products ?? []);
        this.filteredProducts.set(result?.data?.products ?? []);
      });

    effect(() => {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist()));
    });
  }

  onFiltersChanged(filters: any): void {
    this.filteredProducts.set(
      this.products()
        .filter(
          (product) =>
            (filters.category === 'all' ||
              product.category.name?.toLowerCase() ===
                filters.category?.toLowerCase()) &&
            product.price >= filters.minPrice &&
            product.price <= filters.maxPrice
        )
        .sort((a, b) => {
          if (filters.sortBy === 'price') return a.price - b.price;
          return a.title.localeCompare(b.title);
        })
    );
  }

  toggleWishlist(productId: string) {
    const list = this.wishlist();
    const isSaved = list.includes(productId);
    this.wishlist.set(
      isSaved ? list.filter((id) => id !== productId) : [...list, productId]
    );
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist().includes(productId);
  }

  private getStoredWishlist(): string[] {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  }
}
