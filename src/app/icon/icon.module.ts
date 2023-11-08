import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { RoundedIconDirective } from './icon.directive';
import { SearchComponent } from './search/search.component';
import { PlusComponent } from './plus/plus.component';

@NgModule({
  declarations: [
    DocumentComponent,
    SearchComponent,
    RoundedIconDirective,
    PlusComponent,
  ],
  exports: [
    DocumentComponent,
    SearchComponent,
    RoundedIconDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class IconModule { }
