import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { HomeStartComponent } from './home-start/home-start.component';
import { HomeComponent } from './home.component';
import { BoardFormComponent } from '../project/projectsetting/components/board-form/board-form.component';
import { IssueTypesComponent } from '../project/projectsetting/components/issue-types/issue-types.component';
import { ProjectFormComponent } from '../project/project-form/project-form.component';
import { HomeBoardsComponent } from './home-boards/home-boards.component';
import { HomeTemplateComponent } from './home-template/home-template.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: 'boards',
        component: HomeBoardsComponent,
      },
      {
        path: 'template',
        component: HomeTemplateComponent,
      },
      {
        path: '',
        component: HomeStartComponent,
      },
    ],
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
