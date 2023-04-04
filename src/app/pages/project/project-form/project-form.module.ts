import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProjectFormModule {}
