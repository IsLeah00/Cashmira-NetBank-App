import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AdminHomeComponent } from './home/admin-home.component';
import { RegistrationManagementComponent } from './management/registration/registration-management.component';
import { UserManagementComponent } from './management/user/user-management.component';
import { LogoutDialogComponent } from './logout/dialog/logout-dialog.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    RegistrationManagementComponent,
    UserManagementComponent,
    LogoutDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatFormField,
    MatSlideToggleModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class AdminModule {}
