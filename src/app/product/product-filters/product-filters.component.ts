import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ICategory } from '../product.model';
import { ProductService } from '../product.service';
import { DEFAULT_FILTERS, IFiltersModel } from './product-filters.model';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent implements OnDestroy {
  private readonly productService: ProductService = inject(ProductService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  @Output() filtersChanged = new EventEmitter<IFiltersModel>();

  categories: Signal<ICategory[]> = this.productService.getCategories();
  filterForm: FormGroup = this.fb.group(DEFAULT_FILTERS);
  subscription: Subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.filterForm.valueChanges
        .pipe(debounceTime(100))
        .subscribe((filters) => {
          this.filtersChanged.emit(filters);
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
