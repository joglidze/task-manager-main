import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Column, IBoard } from 'src/app/core/interfaces/board';
import { ITask } from 'src/app/core/interfaces/task';
import { AddTaskService } from 'src/app/core/services/add-task.service';
import { BoardService } from 'src/app/core/services/board.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss'],
})
export class CurrentBoardComponent implements OnInit {
  boardId!: number;
  board: IBoard = {} as IBoard;
  tasks: any = {
   
  };

  lists: any = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    private taskService: AddTaskService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.boardId = +params['id'];
        this.getBoard();
      }
    });
  }
  getBoard() {
    this.boardService.getTarBoard(this.boardId).subscribe((board) => {
      this.lists = board.columns;
      this.board = board;
      this.getTasks();
    });
  }
  addTask(column: Column) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '900px',
      data: {
        boardId: this.boardId,
        column: column,
      },
    });
    dialogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getTasks();
      }
    });
  }

  private getTasks() {
    this.taskService.getTasks({ boardId: this.boardId }).subscribe((tasks) => {
      this.tasks = _.groupBy(tasks, 'boardColumnId');
    });
  }

  drop(event: CdkDragDrop<any>, column: Column) {
   

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const tasks: ITask[] = event.container.data.map(
        (task: ITask, index: number) => {
          return {
            ...task,
            taskStatus: column.taskStatus,
            boardColumnId: column.id,
          };
        }
      );
      this.tasks[column.id] = tasks;
      const currentTask = tasks[event.currentIndex];
     
      this.taskService
        .updateTask(currentTask.id, currentTask)
        .subscribe((task) => {
          
          this.getTasks();
        });
    }
  }
  viewTask(task: ITask, column: Column) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '900px',
      data: {
        boardId: this.boardId,
        column: column,
        taskId: task.id,
      },
    });
    dialogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getTasks();
      }
    });
  }



  onColumnDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }


}
