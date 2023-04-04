import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subject, takeUntil } from 'rxjs';
import { Column } from 'src/app/core/interfaces';
import { ITask } from 'src/app/core/interfaces/task';
import { AddTaskService } from 'src/app/core/services/add-task.service';
import { AddTaskComponent } from '../board/add-task/add-task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit, OnDestroy {
  loader:boolean = true;


  displayedColumns: string[] = [
    'id',
    'name',
    'issueType',
    'epic',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<ITask>();

  sub$ = new Subject();
  constructor(private taskService: AddTaskService, private dialog: MatDialog) {}
  ngOnInit(): void {
    
    this.getTask();
  }

  getTask() {
    this.taskService
      .getTasks({ isBacklog: true })
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.dataSource.data = res;
        if(res){
          this.loader=false
        }else{
          true
        }
        
      });
  }
  addTask(taskId?: Column) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '900px',
      data: {
        isBacklog: true,
        taskId,
      },
    });
    dialogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getTask();
      }
    });
  }

  onEdit(taskId?:number){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '900px',
      data: {
        isBacklog: true,
        taskId,
      },
    });
    dialogRef.afterClosed().subscribe(res=>{
      
      if(res){
        this.getTask()
      }
    })
  }
  onDelete(id:number){
    this.taskService.deleteTask(id).subscribe(res=>{
      if(res){
        this.getTask()
      }
      
    })
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
