import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
 
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HeaderComponent} from './header/header.component';
import{MessageComponent} from './shared/message/message.component';
import {StockComponent} from './stock/stock.component';


import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthenticateService} from './services/authenticate.service';
import {PrimengModule} from './primeng.module';
import { CategoryService } from './services/category.service';
import { InterceptorService } from './shared/interceptor.service';
import {ProductService} from './services/product.service';
import {StockService} from './services/stock.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    CategoryComponent,
    ProductsComponent,
    OrderComponent,
    AuthenticateComponent ,
    HeaderComponent,MessageComponent,StockComponent
  ],
  imports: [
    MaterialModule,PrimengModule,
    BrowserModule, HttpClientModule, FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
 
  ],
  providers: [AuthenticateService,CategoryService,ProductService,StockService,{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
