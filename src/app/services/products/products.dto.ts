import { ProductCategory } from 'src/app/entities/product-category.entity';
import { ProductColor } from 'src/app/entities/product-color.entity';
import { ProductPattern } from 'src/app/entities/product-pattern.entity';
import { ProductSize } from 'src/app/entities/product-size.entity';
import { ProductEntity } from 'src/app/entities/product.entity';

export type GetProductDTO = ProductEntity;
export type PostProductDTO = Omit<ProductEntity, 'id' | 'name'> & {
  pattern: ProductPattern.Enum;
  category: ProductCategory.Enum;
  size: ProductSize.Enum;
  color: ProductColor.Enum;
};

export type DeleteProductDTO = Pick<GetProductDTO, 'id'>;
