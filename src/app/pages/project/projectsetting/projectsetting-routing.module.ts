import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueTypesComponent } from './components/issue-types/issue-types.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { ProjectAboutComponent } from './components/project-about/project-about.component';

import { ProjectBoardsComponent } from './components/project-boards/project-boards.component';
import { ProjectEpicformComponent } from './components/project-epicform/project-epicform.component';
import { ProjectEpicsComponent } from './components/project-epics/project-epics.component';

import { ProjectIssuetypesComponent } from './components/project-issuetypes/project-issuetypes.component';
import { ProjectUserformComponent } from './components/project-userform/project-userform.component';
import { ProjectsettingComponent } from './projectsetting.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsettingComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
      },
      {
        path: 'about',
        component: ProjectAboutComponent,
      },
      {
        path: 'BoardForm',
        loadChildren: () =>
          import('./components/board-form/board-form.module').then(
            (m) => m.BoardFormModule
          ),
        component: BoardFormComponent,
      },
      {
        path: 'BoardForm/:id',
        loadChildren: () =>
          import('./components/board-form/board-form.module').then(
            (m) => m.BoardFormModule
          ),
        component: BoardFormComponent,
      },
      {
        path: 'issueTypesForm/add',
        component: IssueTypesComponent,
      },
      {
        path: 'issueTypesForm/edit/:id',
        component: IssueTypesComponent,
      },
      {
        path: 'boards',
        children: [
          {
            path: '',
            component: ProjectBoardsComponent,
          },
          {
            path: 'add',
            component: ProjectBoardsComponent,
          },
          {
            path: 'edit/:id',
            component: ProjectBoardsComponent,
          },
        ],
      },

      {
        path: 'issuetypes',
        children: [
          {
            path: '',
            component: ProjectIssuetypesComponent,
          },
          {
            path: 'add',
            component: ProjectIssuetypesComponent,
          },
          {
            path: 'edit/:id',
            component: ProjectIssuetypesComponent,
          },
        ],
      },
      {
        path: 'epics',
        children: [
          {
            path: '',
            component: ProjectEpicsComponent,
          },
          {
            path: 'add',
            component: ProjectEpicformComponent,
          },
          {
            path: 'edit/:id',
            component: ProjectEpicformComponent,
          },
        ],
      },
      {
        path: 'projectusers',
        component: ProjectUserformComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsettingRoutingModule {}
