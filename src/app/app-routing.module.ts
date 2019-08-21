import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { TransactionAddComponent } from './transaction/add/add.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportComponent } from './report/report.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthRequiredGuard } from './guards/auth-required.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'purchase',
    component: TransactionAddComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'sell',
    component: TransactionAddComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthRequiredGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthRedirectGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
