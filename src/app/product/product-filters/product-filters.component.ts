import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class ProductFiltersComponent {
  categories = ['clothes', 'electronics', 'furniture', 'shoes', 'others'];

  filterForm: FormGroup;

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: ['all'],
      minPrice: [0],
      maxPrice: [10000],
      sortBy: [],
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe((filters) => {
        this.filtersChanged.emit(filters);
      });
  }
}
