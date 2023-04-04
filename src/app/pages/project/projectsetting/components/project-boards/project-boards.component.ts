import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces/board';
import { IProject } from 'src/app/core/interfaces/project';
import { ProjectService } from 'src/app/core/services';
import { BoardService } from 'src/app/core/services/board.service';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-project-boards',
  templateUrl: './project-boards.component.html',
  styleUrls: ['./project-boards.component.scss'],
})
export class ProjectBoardsComponent implements OnInit, OnDestroy {
  loader = true;
  constructor(
    private boardSrv: BoardService,
    private projectSrv: ProjectService,
    private projectFacadeSrv: ProjectFacadeService,
    private router: Router
  ) {}
  dataSource = new MatTableDataSource<IBoard>();
  sub$ = new Subject();
  project?: IProject;

  fullProjectId: any;

  ngOnInit(): void {
    this.getBoards();
    this.project = this.projectFacadeSrv.getProject();
    //console.log()(this.project.id);
    if (this.project.id > 0) {
      this.fullProjectId = this.project.id;
      //console.log()(this.fullProjectId);
    }
  }

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  getBoards() {
    this.boardSrv
      .getboard()
      .pipe(takeUntil(this.sub$))
      .subscribe((boards) => {
        this.loader = false;

        this.dataSource.data = boards;
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
  onBoard() {
    //console.log()(this.fullProjectId);
    this.router.navigate(['/project/setting/BoardForm']);
  }
  onDelete(elementId: any) {
    //console.log()(elementId);
    return this.boardSrv.deleteBoard(elementId).subscribe((res) => {
      if (res) {
        this.getBoards();
      }
      //console.log()(res);
    });
  }
}
