import { Component, Input, Type } from '@angular/core';
import { PlusComponent } from '../icon/plus/plus.component';
import { DocumentComponent } from '../icon/document/document.component';
import { SearchComponent } from '../icon/search/search.component';
import { EuroComponent } from '../icon/euro/euro.component';
import { InputmaskOptions } from '@ngneat/input-mask';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent {
  standaloneControl = new FormControl();

  private icons: Record<string, Type<any>> = {
    plus: PlusComponent,
    document: DocumentComponent,
    search: SearchComponent,
    euro: EuroComponent,
  };

  @Input() name: string = '';
  @Input() formGroup?: any;
  @Input() inputMask?: InputmaskOptions<unknown>;

  @Input() currentIcon?: Type<any>;
  @Input() icon?: string = '';
  @Input() onTextChange?: (event: Event) => void;

  private refreshIcon() {
    if (this.icon && this.icon.length > 0) {
      this.currentIcon = this.icons[this.icon];
    }
  }

  ngOnInit() {
    this.refreshIcon();
  }

  ngOnChanges() {
    this.refreshIcon();
  }
}
