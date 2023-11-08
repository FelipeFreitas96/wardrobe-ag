import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { RoundedIconDirective } from './icon.directive';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DocumentComponent,
    SearchComponent,
    RoundedIconDirective,
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
