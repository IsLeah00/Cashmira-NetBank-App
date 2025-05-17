import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
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
import { NgChartsModule } from 'ng2-charts';

import { UserHomeComponent } from './home/user-home.component';
import { LogoutDialogComponent } from './logout/dialog/logout-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteDialogComponent } from './profile/dialog/delete-dialog.component';
import { CardManagementComponent } from './management/card-management.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferComponent } from './transfer/transfer.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    LogoutDialogComponent,
    ProfileComponent,
    DeleteDialogComponent,
    CardManagementComponent,
    TransactionsComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    NgChartsModule
  ]
})
export class UserModule {}
