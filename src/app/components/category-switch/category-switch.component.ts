import { Component } from '@angular/core';

@Component({
  selector: 'app-category-switch',
  templateUrl: './category-switch.component.html',
  styleUrls: ['./category-switch.component.sass'],
})
export class CategorySwitchComponent {
  selectedIndex: number = 1;
  categories: string[] = [
    'All',
    'Tops',
    'Dresses',
    'Bottoms',
    'Jacket',
    'Shoes',
  ];

  selectIndex(index: number) {
    this.selectedIndex = index;
  }
}
