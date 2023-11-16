import { Component } from '@angular/core';
import { DataDTO } from './components/table/component/table.component';
import { AppService, TableItems } from './app.service';
import { Utils } from './utils';
import { ProductCategory } from './entities/product-category.entity';
import { ProductPattern } from './entities/product-pattern.entity';
import { ProductSize } from './entities/product-size.entity';
import { ProductColor } from './entities/product-color.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'foodtruck-ag';
  products_mapping = {
    id: (value: string) => {
      return String(value).padStart(4, '0');
    },
    name: null,
    category: (value: string) => {
      return ProductCategory.Dictionary[
        Number(value) as ProductCategory.Enum
      ][0];
    },
    quantity: null,
    price: (value: string) => {
      return Number(value).toLocaleString('en-IE', {
        style: 'currency',
        currency: 'EUR',
      });
    },
  };

  products_headers = [
    'ID',
    'Product name',
    'Category',
    'Quantity',
    'Price',
    '',
  ];

  products: DataDTO<TableItems> = {
    items: [],
    total: 0,
  };

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.products = this.appService.getProducts();
  }
}
