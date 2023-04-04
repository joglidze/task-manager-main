import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IProject } from 'src/app/core/interfaces/project';
import { ProjectService } from 'src/app/core/services';
import { BoardFormService } from 'src/app/core/services/board-form.service';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  backgroundColor: string[] = [];
  backgroundImg: string[] = [];
  createProject!: FormGroup;
  color = '';
  background =
    'https://plus.unsplash.com/premium_photo-1674752365557-166d7edc8081?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80';

  sub$ = new Subject();
  constructor(
    private boardFormSrv: BoardFormService,

    private router: Router,
    private projectService: ProjectService,
    private projectFacadeService: ProjectFacadeService
  ) {}
  ngOnInit(): void {
    this.backgroundColor = this.boardFormSrv.boardColors;
    this.backgroundImg = this.boardFormSrv.boardImages;

    this.createProject = new FormGroup({
      name: new FormControl('', Validators.required),
      abbreviation: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null), this.sub$.complete();
  }
  onColor(colors: string) {
    this.color = colors;
    this.background = colors;
  }
  onSubmit() {
    this.projectService
      .createProject(this.createProject.value)
      .pipe(
        takeUntil(this.sub$),
        tap((res) => this.projectFacadeService.setProject(res.id)),
        switchMap(() => this.projectFacadeService.getMyProjects())
      )
      .subscribe((res) => {
        this.router.navigate(['project/setting']);
      });

    //console.log()(this.createProject.value);
  }

  getStyle() {
    if (this.color.startsWith('http')) {
      return { 'background-image': `url('${this.color}')` };
    } else if (this.color.startsWith('rgb') || this.color.startsWith('#')) {
      return { 'background-color': this.color };
    } else {
      //console.log()(this.color);
      return {};
    }
  }
}
