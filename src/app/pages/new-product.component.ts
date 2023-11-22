import { Component, Input } from '@angular/core';
import { ProductCategory } from '../entities/product-category.entity';
import { createMask } from '@ngneat/input-mask';
import { ProductSize } from '../entities/product-size.entity';
import { ProductColor } from '../entities/product-color.entity';
import { ProductPattern } from '../entities/product-pattern.entity';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AppService, TableItems } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { FakeHttpError } from '../utils/error';

@Component({
  selector: 'page-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.sass'],
})
export class NewProductComponent {
  constructor(
    private appService: AppService,
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
    id: new FormControl('A'),
    category: new FormControl('0'),
    size: new FormControl('0'),
    color: new FormControl('0'),
    pattern: new FormControl('0'),
    quantity: new FormControl('0'),
    price: new FormControl('0'),
  });

  productFormMask = {
    id: createMask({
      regex: '^[0-9]{4}$',
      clearIncomplete: false,
      clearMaskOnLostFocus: false,
      nullable: false,
      rightAlign: false,
    }),
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
    for (const [index, entry] of controls) {
      entry.markAsTouched({ onlySelf: true });
      if (entry.status === 'INVALID') {
        error = true;
      }
    }

    if (error) return;

    const { id, category, size, color, pattern, quantity, price } =
      this.productFormGroup.value;

    this.appService
      .addProduct({
        id: Number(id),
        category: Number(category),
        size: Number(size),
        color: Number(color),
        pattern: Number(pattern),
        quantity: Number(quantity),
        price: Number(price?.replaceAll(',', '')),
      })
      .then(this.onSubmit)
      .catch((err) => {
        if (err instanceof FakeHttpError) {
          this.toastService.error('Error', err.message);
        } else {
          this.toastService.error('Error', 'Unexpected error');
        }
      });
  };

  @Input() onSubmit: ((item: TableItems[]) => void) | undefined;
}
