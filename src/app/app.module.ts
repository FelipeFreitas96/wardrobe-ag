import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { IconModule } from './icon/icon.module';
import { CategorySwitchComponent } from './category-switch/category-switch.component';

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent, HeaderComponent, CategorySwitchComponent],
  imports: [BrowserModule, AppRoutingModule, IconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
