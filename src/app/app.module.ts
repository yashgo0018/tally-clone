import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, enableProdMode } from '@angular/core';

import { AppComponent } from './app.component';
import { AddComponent } from './contact/add/add.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './commons/header/header.component';
import { ListComponent } from './contact/list/list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product/add/add.component';
import { ProductListComponent } from './product/list/list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionAddComponent } from './transaction/add/add.component';
import { TransactionListComponent } from './transaction/list/list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebase } from './../environments/firebase';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { ContactService } from './services/contact.service';
import { ProductService } from './services/product.service';
import { TransactionService } from './services/transaction.service';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { GoogleLoginButtonComponent } from './authentication/plugins/google-login-button/google-login-button.component';
import { FacebookLoginButtonComponent } from './authentication/plugins/facebook-login-button/facebook-login-button.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AddComponent,
    AppComponent,
    ContactComponent,
    HeaderComponent,
    ListComponent,
    NavigationComponent,
    ProductComponent,
    ProductAddComponent,
    ProductListComponent,
    TransactionComponent,
    TransactionAddComponent,
    TransactionListComponent,
    ReportComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    ChartsModule,
    AngularFireAuthModule
  ],
  providers: [ContactService, ProductService, TransactionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
