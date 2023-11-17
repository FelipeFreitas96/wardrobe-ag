import { Component, Input } from '@angular/core';
import { ProductCategory } from '../../entities/product-category.entity';

@Component({
  selector: 'app-category-switch',
  templateUrl: './category-switch.component.html',
  styleUrls: ['./category-switch.component.sass'],
})
export class CategorySwitchComponent {
  @Input() onChange?: (index: number) => void;

  selectedIndex: number = 1;
  categories: string[] = [
    'All',
    ...Object.values(ProductCategory.Dictionary).map((item) => item[1]),
  ];

  selectIndex(index: number) {
    this.selectedIndex = index;
    this.onChange?.(index - 1);
  }
}
