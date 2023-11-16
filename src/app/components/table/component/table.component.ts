import { Component, HostListener, Input } from '@angular/core';

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
  rowPerPage = 10;
  position = {
    x: 0,
    y: 0,
  };

  @Input() rowsPerPage = 10;
  @Input() headers: string[] = [];
  @Input() mapping: DataMapping = {};
  @Input() data: DataDTO<Record<string, unknown>> = {
    items: [],
    total: 0,
  };

  @HostListener('document:click', ['$event', 'this']) onDocumentClick() {
    if (!this.hide) {
      this.closeSettings();
    }
  }

  getTableByIndex(index: number, value: string) {
    let str = this.data.items[index][value];
    if (this.mapping?.[value]) {
      str = this.mapping[value]!(String(str));
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

  openSettings(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const positionX = Math.abs(event.clientX - event.offsetX);
    const positionY = Math.abs(event.clientY - event.offsetY);

    this.position.x = positionX - 120;
    this.position.y = positionY + 5;
    this.hide = false;
  }
}
