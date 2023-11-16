import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { IconModule } from './components/icon/icon.module';
import { CategorySwitchComponent } from './components/category-switch/category-switch.component';
import { NavComponent } from './components/nav/nav.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableModule } from './components/table/table.module';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    HeaderComponent,
    CategorySwitchComponent,
    NavComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, TableModule, AppRoutingModule, IconModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
