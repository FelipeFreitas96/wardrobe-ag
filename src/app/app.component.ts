import { Component, OnChanges, OnInit } from '@angular/core';
import { AppService, TableItems } from './app.service';
import { ProductCategory } from './entities/product-category.entity';
import { TableEntity } from './entities/table.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  title = 'foodtruck-ag';
  search_input = '';
  products_table: TableEntity<TableItems> = {
    headers: ['ID', 'Product name', 'Category', 'Quantity', 'Price', ''],
    pageSize: 10,
    page: 0,
    mapping: {
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
    },
    data: {
      items: [],
      total: 0,
    },
  };

  private refetch() {
    this.products_table.data = this.appService.getProducts(
      this.products_table.page,
      this.products_table.pageSize,
      this.search_input
    );
  }

  onChangePage = (event: Event, value?: number) => {
    if (!value) {
      const target = event.target as HTMLInputElement;
      value = Number(target.value) - 1;
      this.products_table.page = value;
    } else if (value === -1) {
      this.products_table.page = Math.max(0, this.products_table.page - 1);
    } else if (value === 1) {
      this.products_table.page = Math.min(
        this.products_table.page + 1,
        Math.floor(
          (this.products_table.data.total - 1) / this.products_table.pageSize
        )
      );
    }
    this.refetch();
  };

  onSearch = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.search_input = value;
    this.refetch();
  };

  onChangeRowsPerPage = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    this.products_table.pageSize = Number(value);
    this.refetch();
  };

  ngOnInit() {
    this.refetch();
  }
}
