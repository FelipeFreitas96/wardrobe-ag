import { Component, Input } from '@angular/core';
import { ProductCategory } from '../entities/product-category.entity';
import { createMask } from '@ngneat/input-mask';
import { ProductSize } from '../entities/product-size.entity';
import { ProductColor } from '../entities/product-color.entity';
import { ProductPattern } from '../entities/product-pattern.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../services/products/products.service';
import { ProductEntity } from '../entities/product.entity';
import { DataDTO } from '../components/table/table.component';

@Component({
  selector: 'page-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.sass'],
})
export class NewProductComponent {
  constructor(
    private productsService: ProductsService,
    private toastService: ToastrService
  ) {}

  categoryOptions = Object.values(ProductCategory.Dictionary).map(
    (item, value) => ({ value, label: item[1] })
  );

  sizeOptions = Object.values(ProductSize.Dictionary).map((item, value) => ({
    value,
    label: item[0],
  }));

  colorOptions = Object.values(ProductColor.Dictionary).map((item, value) => ({
    value,
    label: item[0],
  }));

  patternOptions = Object.values(ProductPattern.Dictionary).map(
    (item, value) => ({ value, label: item[0] })
  );

  productFormGroup = new FormGroup({
    category: new FormControl('0'),
    size: new FormControl('0'),
    color: new FormControl('0'),
    pattern: new FormControl('0'),
    quantity: new FormControl('0'),
    price: new FormControl('0'),
  });

  productFormMask = {
    quantity: createMask({
      alias: 'numeric',
      radixPoint: '',
      clearMaskOnLostFocus: false,
      allowMinus: false,
      min: 0,
      rightAlign: false,
      placeholder: '0',
    }),
    price: createMask({
      alias: 'numeric',
      groupSeparator: ',',
      clearMaskOnLostFocus: false,
      min: 0.0,
      digits: 2,
      rightAlign: false,
      digitsOptional: false,
      allowMinus: false,
      placeholder: '0.00',
    }),
  };

  onProductSubmit = () => {
    let error = false;

    const controls = Object.entries(this.productFormGroup.controls);
    for (const [_, entry] of controls) {
      entry.markAsTouched({ onlySelf: true });
      if (entry.status === 'INVALID') {
        error = true;
      }
    }

    if (error) return;

    const { category, size, color, pattern, quantity, price } =
      this.productFormGroup.value;

    this.productsService
      .addProduct({
        category: Number(category),
        size: Number(size),
        color: Number(color),
        pattern: Number(pattern),
        quantity: Number(quantity),
        price: Number(price?.replaceAll(',', '')),
      })
      .then(this.onSubmit)
      .catch(() => {
        this.toastService.error('Error', 'Unexpected error');
      });
  };

  @Input() onCancel: (() => void) | undefined;
  @Input() onSubmit: ((item: DataDTO<ProductEntity>) => void) | undefined;
}
