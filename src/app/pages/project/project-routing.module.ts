import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent ,
  },
  {
    path: 'add',
    component: AddEditComponent
  },
  {
    path: 'edit/:id',
    component: AddEditComponent
  },
  {
    path: 'setting',
    loadChildren: () => import('./projectsetting/projectsetting.module').then(m => m.ProjectsettingModule)
  },
  {
    path: 'projectform',
    loadChildren: () =>
      import('./project-form/project-form.module').then(
        (m) => m.ProjectFormModule
      ),
    component: ProjectFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
