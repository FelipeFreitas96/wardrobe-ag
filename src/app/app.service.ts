import { Injectable } from '@angular/core';
import { DataDTO } from './components/table/table.component';
import { ProductColor } from './entities/product-color.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductSize } from './entities/product-size.entity';
import { ProductPattern } from './entities/product-pattern.entity';
import { Utils } from './utils';

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

    for (let id = 0; id < 100; id++) {
      const _category = Utils.chooseRandomElement(categories);
      const _pattern = Utils.chooseRandomElement(patterns);
      const _colour = Utils.chooseRandomElement(colours);
      const _size = Utils.chooseRandomElement(sizes);

      this.products[this.products.length] = {
        id,
        color: _colour.index,
        size: _size.index,
        pattern: _pattern.index,
        category: _category.index,
        name: `${_colour.value[0]} ${_pattern.value[0]} ${_size.value[0]} ${_category.value[0]}`,
        price: 5 + Math.random() * 15,
        quantity: 100,
      };
    }

    return this.products;
  }

  constructor() {
    this.generateProducts();
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
