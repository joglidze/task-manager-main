import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './users.component';

import { MatDialogModule } from '@angular/material/dialog';
import { UserRoleDialogComponent } from './user-role-dialog/user-role-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule, MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { AddUsersComponent } from './add-users/add-users.component';
@NgModule({
  declarations: [UsersComponent, UserRoleDialogComponent, AddUsersComponent],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule,ReactiveFormsModule,FormsModule,MatSelectModule],
})
export class UsersModule {}
