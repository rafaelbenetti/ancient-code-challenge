import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-products-header',
  imports: [RouterModule],
  templateUrl: './products-header.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHeaderComponent {
  @Input() title: string;

  wishlistService: WishlistService = inject(WishlistService);
  wishlistCount: Signal<number> = this.wishlistService.wishlistCount;
}
