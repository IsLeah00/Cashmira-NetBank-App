import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './home/admin-home.component';
import { RegistrationManagementComponent } from './management/registration/registration-management.component';
import { UserManagementComponent } from './management/user/user-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'registration', component: RegistrationManagementComponent },
      { path: 'users', component: UserManagementComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
