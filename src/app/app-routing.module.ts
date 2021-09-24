import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MenuComponent } from './menu/menu.component';
import { ProductDetailComponent } from './menu/product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'main', component: MainpageComponent},
  { path : 'cart' , component: CartComponent},
  { path : 'cart/:id' , component: CartComponent},
  { path: 'products/:id' , component : ProductDetailComponent},
  { path: 'products/:id/:email' , component : ProductDetailComponent},
  { path: '' , component : MainpageComponent},
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
