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
import { AppService } from './app.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewProductComponent } from './pages/new-product.component';
import { SelectComponent } from './components/select/select.component';
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    HeaderComponent,
    CategorySwitchComponent,
    NavComponent,
    InputComponent,
    ButtonComponent,
    SidebarComponent,
    NewProductComponent,
    PaginatorComponent,
    SelectComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InputMaskModule,
    IconModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppService,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
