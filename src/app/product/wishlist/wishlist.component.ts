import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';
import { ProductsHeaderComponent } from '../products-header/products-header.component';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [ProductsHeaderComponent, ProductItemComponent],
  templateUrl: './wishlist.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent {
  private readonly productService: ProductService = inject(ProductService);
  private readonly wishlistService: WishlistService = inject(WishlistService);

  private products: Signal<IProduct[]> = this.productService.getProducts();
  private wishlist: Signal<string[]> = this.wishlistService.getWishlist();

  wishlistProducts = computed(() =>
    this.products().filter((product) => this.wishlist().includes(product.id))
  );

  toggleWishlist(productId: string): void {
    this.wishlistService.toggleWishlist(productId);
  }
}
