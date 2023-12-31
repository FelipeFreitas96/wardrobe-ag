import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent {
  cacheArray: number[] = [];
  totalArray: number[] = [];
  
  @Input() total = 0;
  @Input() rowsPerPage = 0;
  @Input() currentPage = 0;
  @Input() onChangeRowsPerPage: ((value: Event) => void) | undefined;
  @Input() onChangePage: ((event: Event, value?: number) => void) | undefined;

  getOptions() {
    return Array(6)
      .fill(0)
      .map((x, i) => {
        const value = String(5 + i);
        return {
          value,
          label: value,
        };
      });
  }

  ngOnChanges() {
    const totalPages = Math.ceil(this.total / this.rowsPerPage);
    if (this.cacheArray.length !== totalPages) {
      this.cacheArray = Array(totalPages)
        .fill(0)
        .map((_, i) => i + 1);
    }

    const start = this.cacheArray.slice(
      Math.min(Math.max(totalPages - 5, 0), Math.max(0, this.currentPage - 2)),
      Math.min(
        Math.max(0, this.currentPage - 2) === 0 ? 3 : this.currentPage + 1,
        totalPages - 2
      )
    );

    const last = this.cacheArray.slice(-2);
    this.totalArray = [...start, ...last];
  }
}
