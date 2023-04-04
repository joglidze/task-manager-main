import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsettingRoutingModule } from './projectsetting-routing.module';
import { ProjectsettingComponent } from './projectsetting.component';
import { ProjectAboutComponent } from './components/project-about/project-about.component';
import { ProjectBoardsComponent } from './components/project-boards/project-boards.component';

import { ProjectIssuetypesComponent } from './components/project-issuetypes/project-issuetypes.component';

import { ProjectEpicsComponent } from './components/project-epics/project-epics.component';
import { ProjectEpicformComponent } from './components/project-epicform/project-epicform.component';
import { ProjectUserformComponent } from './components/project-userform/project-userform.component';
import { UsersRoutingModule } from '../../users/users-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ProjectAboutComponent,
    ProjectBoardsComponent,

    ProjectIssuetypesComponent,
   
    ProjectEpicsComponent,
    ProjectEpicformComponent,
    ProjectUserformComponent,
  
  ],
  imports: [
    CommonModule,
    ProjectsettingRoutingModule,
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
   MatSelectModule,
    MatSelectModule,
  ],
})
export class ProjectsettingModule {}
