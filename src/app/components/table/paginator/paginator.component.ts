import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent {
  totalArray: number[] = [];

  @Input() total = 0;
  @Input() rowsPerPage = 0;

  ngOnChanges() {
    this.totalArray = Array(Math.floor(this.total / this.rowsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }
}
