import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'lodash';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { IProject } from 'src/app/core/interfaces/project';
import { ProjectService } from 'src/app/core/services';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-project-about',
  templateUrl: './project-about.component.html',
  styleUrls: ['./project-about.component.scss'],
})
export class ProjectAboutComponent implements OnInit, OnDestroy {
  mainProject?: IProject;
  projectUsers: any;

  sub$ = new Subject();

  constructor(
    private projectFacadeSrv: ProjectFacadeService,
    private projectService: ProjectService
  ) {}

  get project(): IProject {
    return this.projectFacadeSrv.getProject();
  }

  ngOnInit(): void {
    this.mainProject = this.projectFacadeSrv.getProject();
    this.getProjectUsers();
  }

  getStyle(background: string) {
    if (background.startsWith('http')) {
      return { 'background-image': `url('${background}')` };
    } else if (background.startsWith('#')) {
      return { 'background-color': background };
    } else {
      return {};
    }
  }
  getProjectUsers() {
    this.projectService
      .getProjectUsers()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.projectUsers = res;
        //console.log()(res);
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
