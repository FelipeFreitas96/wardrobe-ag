import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TableComponent } from './table.component';
import { IconModule } from '../icon/icon.module';
import { SelectComponent } from '../select/select.component';

@NgModule({
  exports: [PaginatorComponent, TableComponent],
  declarations: [PaginatorComponent, SelectComponent, TableComponent],
  imports: [CommonModule, IconModule],
})
export class TableModule {}
