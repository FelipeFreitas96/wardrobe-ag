import { Injectable } from '@angular/core';
import { DataDTO } from '../../components/table/table.component';
import {
  DeleteProductDTO,
  GetProductDTO,
  PostProductDTO,
} from './products.dto';

@Injectable()
export class ProductsService {
  async deleteProduct(item: DeleteProductDTO) {
    await fetch(`http://localhost:5100/Products/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async addProduct(item: PostProductDTO) {
    const { color, size, pattern, category, price, quantity } = item;
    await fetch('http://localhost:5100/Products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color,
        size,
        pattern,
        category,
        price,
        quantity,
      }),
    });
    return this.getProducts();
  }

  async getProducts(
    page: number = 0,
    pageSize: number = 10,
    q: string = '',
    category: number = 0
  ): Promise<DataDTO<GetProductDTO>> {
    let url = `http://localhost:5100/Products?Page=${page}&PageSize=${pageSize}&q=${q}`;

    if (category > 0) {
      url += `&Category=${category - 1}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const items = (await response.json()) as DataDTO<GetProductDTO>;
    return {
      total: items.total,
      items: items.items,
    };
  }
}
