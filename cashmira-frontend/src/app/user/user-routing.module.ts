import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './home/user-home.component';
import { ProfileComponent } from './profile/profile.component';
import { CardManagementComponent } from './management/card-management.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'card', component: CardManagementComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transfer', component: TransferComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
