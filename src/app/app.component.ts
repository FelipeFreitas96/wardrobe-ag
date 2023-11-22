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

  title = 'wardrobe-ag';
  productsTable: TableEntity<TableItems> = {
    headers: ['ID', 'Product name', 'Category', 'Quantity', 'Price', ''],
    pageSize: 10,
    page: 0,
    categoryInput: 0,
    searchInput: '',
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
    this.productsTable.data = this.appService.getProducts(
      this.productsTable.page,
      this.productsTable.pageSize,
      this.productsTable.searchInput,
      this.productsTable.categoryInput
    );
  }

  onSubmit = () => {
    this.refetch();
  };

  onFilterByCategory = (index: number) => {
    this.productsTable.categoryInput = index;
    this.productsTable.page = 0;
    this.refetch();
  };

  onDeleteItem = (id: number) => {
    this.appService.deleteProduct({ id });
    this.refetch();
  };

  onSearch = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.productsTable.searchInput = value;
    this.productsTable.page = 0;
    this.refetch();
  };

  onCloseModal = () => {
    document.querySelectorAll('.sidebar-component').forEach((sidebar) => {
      if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
      }
    });
  };

  onOpenModal = () => {
    document.querySelectorAll('.sidebar-component').forEach((sidebar) => {
      if (sidebar) {
        sidebar.classList.remove('close');
        sidebar.classList.add('open');
      }
    });
  };

  onChangePage = (event: Event, value?: number) => {
    if (!value) {
      const target = event.target as HTMLInputElement;
      value = Number(target.value) - 1;
      this.productsTable.page = value;
    } else if (value === -1) {
      this.productsTable.page = Math.max(0, this.productsTable.page - 1);
    } else if (value === 1) {
      this.productsTable.page = Math.min(
        this.productsTable.page + 1,
        Math.floor(
          (this.productsTable.data.total - 1) / this.productsTable.pageSize
        )
      );
    }
    this.refetch();
  };

  onChangeRowsPerPage = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    this.productsTable.pageSize = Number(value);
    this.productsTable.page = 0;
    this.refetch();
  };

  ngOnInit() {
    this.refetch();
  }
}
