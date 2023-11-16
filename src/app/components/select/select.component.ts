import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
})
export class SelectComponent {
  @Input() total: number = 0;
  @Input() defaultValue: string | number | undefined;
  @Input() onChangeRowsPerPage: ((value: Event) => void) | undefined;

  totalArray: number[] = [];

  ngOnInit() {
    this.totalArray = Array(this.total)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
