import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesformComponent } from './rolesform/rolesform.component';
import { PermissionformComponent } from './permissionform/permissionform.component';
import {  MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    RolesListComponent,
    RolesformComponent,
    PermissionformComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MatTableModule,
    MatButtonModule, 
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class RolesModule { }
