import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';
import { ProductsHeaderComponent } from '../products-header/products-header.component';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductFiltersComponent,
    ProductItemComponent,
    ProductsHeaderComponent,
  ],
  templateUrl: './products.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  productService: ProductService = inject(ProductService);
  wishlistService: WishlistService = inject(WishlistService);

  products: Signal<IProduct[]> = this.productService.getProducts();

  onFiltersChanged(filters: any): void {
    this.productService.setFilters(filters);
  }

  toggleWishlist(productId: string): void {
    this.wishlistService.toggleWishlist(productId);
  }
}
