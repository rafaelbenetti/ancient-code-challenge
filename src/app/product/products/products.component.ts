import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';
import { WishlistService } from '../wishlist.service';

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

  productService: ProductService = inject(ProductService);
  wishlistService: WishlistService = inject(WishlistService);

  products: Signal<IProduct[]> = this.productService.getProducts();
  wishlistCount: Signal<number> = this.wishlistService.wishlistCount;

  onFiltersChanged(filters: any): void {
    this.productService.setFilters(filters);
  }

  toggleWishlist(productId: string): void {
    this.wishlistService.toggleWishlist(productId);
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}
