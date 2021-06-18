import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from '../app/seller/seller.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { CategoryComponent } from '../app/category/category.component';
import { OrderComponent } from '../app/order/order.component';
import { ProductsComponent } from '../app/products/products.component';
import { AuthenticateComponent } from '../app/authenticate/authenticate.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: '', component: AuthenticateComponent },
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'login', component: AuthenticateComponent },
  { path: 'register', component: AuthenticateComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'stock', component: StockComponent },
  { path: "**", component: AuthenticateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SellerComponent, DashboardComponent, CategoryComponent, ProductsComponent, OrderComponent, StockComponent];
