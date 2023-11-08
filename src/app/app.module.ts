import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { IconModule } from './icon/icon.module';
import { CategorySwitchComponent } from './category-switch/category-switch.component';
import { NavComponent } from './nav/nav.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent, HeaderComponent, CategorySwitchComponent, NavComponent, InputComponent, ButtonComponent],
  imports: [BrowserModule, AppRoutingModule, IconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
