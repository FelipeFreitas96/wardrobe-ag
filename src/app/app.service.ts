import { Injectable } from '@angular/core';
import { DataDTO } from './components/table/table.component';
import { ProductColor } from './entities/product-color.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductSize } from './entities/product-size.entity';
import { ProductPattern } from './entities/product-pattern.entity';
import { Utils } from './utils';
import { FakeHttpError } from './utils/error';

export type TableItems = {
  id: number;
  name: string;

  pattern: ProductPattern.Enum;
  category: ProductCategory.Enum;
  size: ProductSize.Enum;
  color: ProductColor.Enum;

  quantity: number;
  price: number;
};

@Injectable()
export class AppService {
  private products: DataDTO<TableItems>['items'] = [];
  private generateProducts() {
    const categories = Utils.getValuesFromEnum(ProductCategory.Dictionary);
    const colours = Utils.getValuesFromEnum(ProductColor.Dictionary);
    const sizes = Utils.getValuesFromEnum(ProductSize.Dictionary);
    const patterns = Utils.getValuesFromEnum(ProductPattern.Dictionary);
    const data = [];

    for (let id = 0; id < 1000; id++) {
      const _category = Utils.chooseRandomElement(categories);
      const _pattern = Utils.chooseRandomElement(patterns);
      const _colour = Utils.chooseRandomElement(colours);
      const _size = Utils.chooseRandomElement(sizes);

      data[data.length] = {
        id,
        color: _colour.index,
        size: _size.index,
        pattern: _pattern.index,
        category: _category.index,
        name: `${_colour.value[0]} ${_pattern.value[0]} ${_size.value[0]} ${_category.value[0]}`,
        price: 5 + Math.random() * 15,
        quantity: Math.ceil(Math.random() * 10),
      };
    }

    return data;
  }

  private persistOnStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  constructor() {
    const storage = localStorage.getItem('products');
    if (storage) {
      this.products = JSON.parse(storage);
    } else {
      this.products = this.generateProducts();
      this.persistOnStorage();
    }
  }

  async deleteProduct(item: Pick<TableItems, 'id'>) {
    const index = this.products.findIndex((product) => product.id === item.id);
    if (index === -1) {
      throw new FakeHttpError('Product ID not found');
    }

    this.products.splice(index, 1);
    this.persistOnStorage();
    return this.products;
  }

  async addProduct(item: Omit<TableItems, 'name'>) {
    const { id, color, size, pattern, category, price, quantity } = item;
    if (this.products.find((item) => item.id === id)) {
      throw new FakeHttpError('Product ID already exists');
    }

    const categories = Utils.getValuesFromEnum(
      ProductCategory.Dictionary
    ) as unknown as ProductCategory.Enum[][];
    const colours = Utils.getValuesFromEnum(ProductColor.Dictionary);
    const sizes = Utils.getValuesFromEnum(ProductSize.Dictionary);
    const patterns = Utils.getValuesFromEnum(ProductPattern.Dictionary);
    this.products[this.products.length] = {
      id,
      color,
      size,
      pattern,
      category,
      name: `${colours[color]} ${patterns[pattern]} ${sizes[size]} ${categories[category][0]}`,
      price,
      quantity,
    };

    this.persistOnStorage();
    return this.products;
  }

  getProducts(
    page: number = 0,
    pageSize: number = 10,
    q: string = '',
    category: number = 0
  ): DataDTO<TableItems> {
    const start = page * pageSize;
    const end = start + pageSize;
    const items = this.products.filter(
      (item) =>
        (category === 0 || item.category === category - 1) &&
        (q.length === 0 ||
          `${String(item.id).padStart(4, '0')} ${item.name}`
            .toLowerCase()
            .includes(q.toLowerCase()))
    );

    return {
      total: items.length,
      items: items.slice(start, end),
    };
  }
}
