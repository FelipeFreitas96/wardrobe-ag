import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { RoundedIconDirective } from './directives/rounded-icon.directive';
import { SearchComponent } from './search/search.component';
import { PlusComponent } from './plus/plus.component';
import { KebabComponent } from './kebab/kebab.component';
import { HoverableIconDirective } from './directives/hoverable-icon.directive';

const directives = [RoundedIconDirective, HoverableIconDirective];
const components = [
  DocumentComponent,
  SearchComponent,
  PlusComponent,
  KebabComponent,
];

const declarationAndExports = [...directives, ...components];

@NgModule({
  declarations: declarationAndExports,
  exports: declarationAndExports,
  imports: [CommonModule],
})
export class IconModule {}
