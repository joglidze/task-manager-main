import { Component, OnDestroy, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EpicsService } from 'src/app/core/services/epics.service';

import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-project-epicform',
  templateUrl: './project-epicform.component.html',
  styleUrls: ['./project-epicform.component.scss'],
})
export class ProjectEpicformComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  sub$ = new Subject();

  projectId?: number;
  boardId?: any;

  constructor(
    private projectFacadeSrv: ProjectFacadeService,
    private epicSrv: EpicsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.boardId = res;
      this.form.value.id = this.boardId.id;
    });
    this.projectId = this.projectFacadeSrv.getProject().id;

    if (this.boardId.id) {
      this.fillEpicEdit();
    }
  }

  onSubmit() {
    if (!this.boardId.id) {
      //console.log()('add');
      this.epicSrv
        .createEpic(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          //console.log()(res);
          this.router.navigate(['/project/setting/epics']);
        });
    } else {
      //console.log()('update');
      this.epicSrv.updateEpics(this.form.value).subscribe((res) => {
        //console.log()(res);
        this.router.navigate(['/project/setting/epics']);
      });
    }
  }

  fillEpicEdit() {
    this.epicSrv
      .getTarEpics(this.boardId.id)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.form.patchValue(res);
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
