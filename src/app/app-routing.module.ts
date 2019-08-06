import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { TransactionAddComponent } from './transaction/add/add.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'purchase', component: TransactionAddComponent },
  { path: 'sell', component: TransactionAddComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
