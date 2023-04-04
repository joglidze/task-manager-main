import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces';
import { ProjectService } from 'src/app/core/services';
import { BoardService } from 'src/app/core/services/board.service';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-home-boards',
  templateUrl: './home-boards.component.html',
  styleUrls: ['./home-boards.component.scss'],
})
export class HomeBoardsComponent implements OnInit, OnDestroy {
  myBoard?: IBoard[];
  fullProjects: any;
  allBoards: any;
  sub$ = new Subject();
  constructor(
    private boardService: BoardService,
    private projectService: ProjectService,
    private projectFacadeService: ProjectFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getboards();
    this.getAllProjectsBoards();
  }

  getboards() {
    this.boardService
      .getboard()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.myBoard = res;
      });
  }
  getAllProjectsBoards() {
    this.projectService
      .getAllProjectsWithBoards()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.fullProjects = res;
        //console.log()(res);
      });
  }

  getStyle(background: any) {
    if (background.startsWith('http')) {
      return { 'background-image': `url('${background}')` };
    } else if (background.startsWith('rgb') || background.startsWith('#')) {
      return { 'background-color': background };
    } else {
      return {};
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  selectProject(project: any) {
    //console.log()(project.boards);
    this.projectFacadeService.setProject(project.id);
    if (project.boards.length > 0) {
      this.router.navigate(['/board']);
    } else {
      this.router.navigate(['/project/setting/boards']);
    }
  }
}
