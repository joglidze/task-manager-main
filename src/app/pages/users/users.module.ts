import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersformComponent } from './usersform/usersform.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';

import { MatSelectModule, MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersformComponent,
    UsersRolesComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule, 
    MatButtonModule, 
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
   
  ]
})
export class UsersModule { }
