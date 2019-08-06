import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { firebase } from './../environments/firebase';

import { ContactService } from './services/contact.service';
import { ProductService } from './services/product.service';
import { TransactionService } from './services/transaction.service';
import { ReportComponent } from './report/report.component';

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
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [ContactService, ProductService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
