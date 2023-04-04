import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil, tap } from 'rxjs';
import { IProject } from 'src/app/core/interfaces/project';
import {
  AuthService,
  ProjectService,
  RoleService,
} from 'src/app/core/services';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  projects$ = this.projectFacadeService.myProjects$;
  currentProject?: IProject = this.projectFacadeService.getProject();
  countOfMyProjects!: number;

  sub$ = new Subject();
  role: any;

  constructor(
    private authService: AuthService,
    private toastService: NgToastService,
    private projectService: ProjectService,
    private projectFacadeService: ProjectFacadeService,
    private roleSerivec: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyProjects();
    this.getEachProject();
  }

  logout() {
    this.toastService.success({
      detail: 'SUCCESS',
      summary: 'You have Logged out Successfully',
    });
    this.authService.signOut();
  }

  selectProject(projectId: number) {
    this.projectFacadeService.setProject(projectId);
  }
  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getMyProjects() {
    this.projectFacadeService.getMyProjects().subscribe();
  }

  getEachProject() {
    this.projects$.subscribe(
      (p) => (this.countOfMyProjects = Object.keys(p).length)
    );
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete;
  }
}
