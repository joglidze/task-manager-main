import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './features/main-layout.component';

import { BacklogComponent } from './pages/backlog/backlog.component';

import { ProjectFormComponent } from './pages/project/project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'projectform',
        loadChildren: () =>
          import('./pages/project/project-form/project-form.module').then(
            (m) => m.ProjectFormModule
          ),
        component: ProjectFormComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./pages/project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./pages/roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'backlog',
        loadChildren: () =>
          import('./pages/backlog/backlog.module').then((m) => m.BacklogModule),
        component: BacklogComponent,
      },
      {
        path: 'board',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/board/board.module').then((m) => m.BoardModule),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
