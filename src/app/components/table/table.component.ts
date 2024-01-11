import { Component, HostListener, Input } from '@angular/core';
import { TableEntity } from '../../entities/table.entity';

export type DataMapping = {
  [k: string]: null | ((value: string) => string);
};

export type DataDTO<Items> = {
  total: number;
  items: Items[];
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent {
  hide = true;
  id = '';
  position = {
    x: 0,
    y: 0,
  };

  @Input() rowsPerPage = 10;
  @Input() onTableDeleteItem: ((id: string) => void) | undefined;
  @Input() onChangePage: ((event: Event, value?: number) => void) | undefined;
  @Input() onChangeRowsPerPage: ((event: Event) => void) | undefined;
  @Input() table: TableEntity<Record<string, unknown>> | undefined;
  @HostListener('document:click', ['$event', 'this']) onDocumentClick() {
    if (!this.hide) {
      this.closeSettings();
    }
  }

  getTableByIndex(index: number, value: string) {
    let str = this.table?.data.items[index][value];
    if (this.table?.mapping?.[value]) {
      str = this.table.mapping[value]!(String(str));
    }
    return str;
  }

  keys(obj: DataMapping) {
    return Object.keys(obj);
  }

  closeSettings() {
    this.position.x = 0;
    this.position.y = 0;
    this.hide = true;
  }

  onDeleteItem() {
    this.onTableDeleteItem?.(this.id);
    this.closeSettings();
  }

  openSettings(event: MouseEvent, id: unknown) {
    event.preventDefault();
    event.stopPropagation();

    const positionX = Math.abs(event.clientX - event.offsetX);
    const positionY = Math.abs(event.clientY - event.offsetY);

    this.id = String(id);
    this.position.x = positionX - 120;
    this.position.y = positionY + 5;
    this.hide = false;
  }
}
