import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionformComponent } from './permissionform/permissionform.component';
import { RolesListComponent } from './roles-list/roles-list.component';

const routes: Routes = [
  {
    path: '',
    component: RolesListComponent,
  },
  {
    path: 'permissions/:roleId',
    component: PermissionformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
