import { computed, effect, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly wishlistStorageKey: string = 'wishlist';
  private wishlist = signal<string[]>(this.getStoredWishlist());
  wishlistCount = computed(() => this.wishlist().length);

  constructor() {
    effect(() => {
      localStorage.setItem(
        this.wishlistStorageKey,
        JSON.stringify(this.wishlist())
      );
    });
  }

  toggleWishlist(productId: string): void {
    const list = this.wishlist();
    const isSaved = list.includes(productId);
    this.wishlist.set(
      isSaved ? list.filter((id) => id !== productId) : [...list, productId]
    );
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist().includes(productId);
  }

  getWishlist(): Signal<string[]> {
    return this.wishlist;
  }

  private getStoredWishlist(): string[] {
    const saved = localStorage.getItem(this.wishlistStorageKey);
    return saved ? JSON.parse(saved) : [];
  }
}
