import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ParentComponent } from './components/parent/parent.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  { path : '', component : HomeComponent, title : "Veira Co"},
  { path : 'product/:id', component : ProductDetailComponent},
  { path : 'cart', component : CartComponent},
  { path : 'parent', component : ParentComponent},
  { path : 'checkout', component : CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
})
export class AppRoutingModule { }
