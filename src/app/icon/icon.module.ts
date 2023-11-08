import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { RoundedIconDirective } from './icon.directive';

@NgModule({
  declarations: [
    DocumentComponent,
    RoundedIconDirective,
  ],
  exports: [
    DocumentComponent,
    RoundedIconDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class IconModule { }
