import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
})
export class SelectComponent {
  value: string | number = '';
  standaloneControl = new FormControl();

  ngOnInit() {
    if (this.value === '') {
      this.value = String(this.defaultValue);
    }
  }

  onChangeValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange?.(event);
    this.value = String(target?.value);
  }

  @Input() name: string = '';
  @Input() formGroup?: any;
  @Input() options: {
    value: string | number;
    label: string;
  }[] = [];
  @Input() defaultValue?: string | number;
  @Input() onChange: ((value: Event) => void) | undefined;
}
