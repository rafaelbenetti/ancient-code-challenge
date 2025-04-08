import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { IProduct } from '../product.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  wishlistService: WishlistService = inject(WishlistService);

  @Input() product: IProduct;
  @Output() toggleWishlist = new EventEmitter<string>();

  onToggleWishlist(productId: string): void {
    this.toggleWishlist.emit(productId);
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}
