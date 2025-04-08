import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTS } from '../product.queries';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  products = signal<any[]>([]);
  wishlist = signal<string[]>(this.getStoredWishlist());
  wishlistCount = computed(() => this.wishlist().length);

  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery({ query: GET_PRODUCTS })
      .valueChanges.subscribe((result: any) => {
        this.products.set(result?.data?.products ?? []);
      });

    effect(() => {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist()));
    });
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
