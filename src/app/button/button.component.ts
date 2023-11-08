import { Component, Input, Type } from '@angular/core';
import { PlusComponent } from '../icon/plus/plus.component';
import { DocumentComponent } from '../icon/document/document.component';
import { SearchComponent } from '../icon/search/search.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  private icons: Record<string, Type<any>> = {
    plus: PlusComponent,
    document: DocumentComponent,
    search: SearchComponent,
  };

  @Input() value: string = '';
  @Input() icon: string = '';

  @Input() currentIcon?: Type<any>;

  private refreshIcon() {
    if (this.icon?.length > 0) {
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
