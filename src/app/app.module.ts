import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { ProductFillterComponent } from './product-fillter/product-fillter.component';
import { ProductService } from './product.service';
import { environment } from './environments/environment.prod';
import { ProductsComponent } from './products/products.component';
import { CategoryService } from './category.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out-guest/check-out.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CheckOutMemberComponent } from './check-out-member/check-out-member.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OrderService } from './order.service';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailServiceService } from './email-service.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductCardComponent,
    ProductFillterComponent,
    ProductsComponent,
    ProductQuantityComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    CartSummaryComponent,
    CheckOutMemberComponent,
    ShippingFormComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path:'' , component:HomeComponent},

      {path:'products' , component:ProductsComponent},
      {path:'cat' , component:ProductsComponent},

      {path:'contacts' , component:ContactComponent},
      {path:'goToLogin' , component:LoginComponent},
      {path:'register' , component:RegisterComponent},
      {path:'login' , component:LoginComponent},
      {path:'forgot-password' , component:ForgotPasswordComponent},
      {path:'shopping-cart' , component:ShoppingCartComponent},
      {path:'check-out-guest' , component:CheckOutComponent},
      {path:'check-out-member' , component:CheckOutMemberComponent , canActivate: [AuthGuardService] },
      {path:'contact' , component:ContactComponent},

   
    ]),
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    CategoryService,
    OrderService,
    EmailServiceService,
    UserService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
