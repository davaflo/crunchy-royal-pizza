import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ProductoService } from './shared/producto.service';
import { MenuThumbnailComponent } from './menu/menu-thumbnail/menu-thumbnail.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './shared/usuarios.services';
import { OrdenService } from './shared/orden.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './menu/product-detail/product-detail.component';
import { ReviewThumbnailComponent } from './menu/product-detail/review-thumbnail/review-thumbnail.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavbarComponent,
    MenuComponent,
    MainpageComponent,
    MenuThumbnailComponent,
    CartComponent,
    ProductDetailComponent,
    ReviewThumbnailComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '849493796373-l3gcfrivvreachetoua367c0ktbb161m.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('875721023059687'),          
          },
        ],
      } as SocialAuthServiceConfig,
    },
    ProductoService,
    OrdenService,
    UsuarioService
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
