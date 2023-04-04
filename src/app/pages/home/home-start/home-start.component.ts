import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IProject } from 'src/app/core/interfaces';
import { ProjectService } from 'src/app/core/services';
import { BoardService } from 'src/app/core/services/board.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-home-start',
  templateUrl: 'home-start.component.html',
  styleUrls: ['./home-start.component.scss'],
})
export class HomeStartComponent implements OnInit, OnDestroy {
  projects: any;
  allUsers: any;
  projectNameArray?: string[];
  myProjects: any;

  sub$ = new Subject();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private boardService: BoardService,
    private roleService: RoleService,
    private userService: UsersService,
    private projectFacadeService: ProjectFacadeService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getMyProjects();

    this.getAllUsers();
  }

  selectProject(project: any) {
    //console.log()(project);
    this.projectFacadeService.setProject(project.id);
    this.router.navigate(['/board']);
  }
  getStyle(background: string) {
    if (background.startsWith('http')) {
      return { 'background-image': `url('${background}')` };
    } else if (background.startsWith('rgb') || background.startsWith('#')) {
      return { 'background-color': background };
    } else {
      return {};
    }
  }

  getProjects() {
    this.projectService.getProjects().subscribe((res) => {
      this.projects = res;
      this.projects = this.projects.data;
      this.boardService
        .getboard()
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {});
    });
  }

  getMyProjects() {
    this.projectService
      .getMyProjects()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        //console.log()(res);
        this.myProjects = res;
      });
  }

  getAllUsers() {
    this.userService
      .getAllUsers()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.allUsers = res;
        //console.log()(this.allUsers);
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
