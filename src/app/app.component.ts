import { Component, OnInit } from '@angular/core';
import { ProductCategory } from './entities/product-category.entity';
import { TableEntity } from './entities/table.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './services/products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  title = 'wardrobe-ag';
  productsTable: TableEntity<ProductEntity> = {
    headers: ['ID', 'Product name', 'Quantity', 'Price', ''],
    pageSize: 10,
    page: 0,
    categoryInput: 0,
    searchInput: '',
    mapping: {
      id: null,
      name: null,
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

  private async refetch() {
    this.productsTable.data = await this.productsService.getProducts(
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

  onDeleteItem = (id: string) => {
    this.productsService.deleteProduct({ id }).then(() => {
      this.refetch();
    });
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
