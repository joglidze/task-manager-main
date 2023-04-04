import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { Column, IBoard } from 'src/app/core/interfaces/board';
import { IEpic } from 'src/app/core/interfaces/epic';
import { IssueType } from 'src/app/core/interfaces/issue-type';
import { ProjectService } from 'src/app/core/services';
import { AddTaskService } from 'src/app/core/services/add-task.service';
import { BoardService } from 'src/app/core/services/board.service';
import { EpicsService } from 'src/app/core/services/epics.service';
import { IssueTypeService } from 'src/app/core/services/issue-type.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  inputValue?: string;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),

    name: new FormControl(null,Validators.required),
    description: new FormControl(null,Validators.required),
    issueTypeId: new FormControl(null,Validators.required),
    epicId: new FormControl(null,Validators.required),
    boardId: new FormControl(null,Validators.required),
    priority: new FormControl(null,Validators.required),
    isBacklog: new FormControl(true,Validators.required),
    boardColumnId: new FormControl(null),
    taskStatus: new FormControl(this.data.column?.taskStatus || 'ToDo', Validators.required),
    assigneeId: new FormControl(null,Validators.required),
    reporterId: new FormControl(null,Validators.required),
    taskProperty: new FormArray([])

  });

  sub$ = new Subject();
  boards$: Observable<IBoard[]> = this.boardService.getboard();
  types$: Observable<IssueType[]> = this.issueTypeService.getIssueTypes();
  epics$: Observable<IEpic[]> = this.epicService.getAllEpics();
  users$: Observable<IUser[]> = this.projectService
    .getProjectUsers()
    .pipe(shareReplay(2));
  priorities: { id: 'LOW' | 'MEDIUM' | 'HIGH'; name: string }[] = [
    { id: 'LOW', name: 'Low' },
    { id: 'MEDIUM', name: 'Medium' },
    { id: 'HIGH', name: 'High' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: AddTaskService,
    private issueTypeService: IssueTypeService,
    private epicService: EpicsService,
    private boardService: BoardService,
    private projectService: ProjectService,

    @Inject(MAT_DIALOG_DATA) public data: {boardId: number,taskId:number, column: Column}
  ){
    
  }
  

  get taskProperty() {
    return this.form.get('taskProperty') as FormArray;
  }

  ngOnInit(): void {

    if(this.data.taskId){
      this.getTask(this.data.taskId)
    }else {
      this.form.get('issueTypeId')?.valueChanges
        .pipe(takeUntil(this.sub$))

        .subscribe((issueTypeId: number) => {
          this.getIssueTypeProperties(issueTypeId);
        });
    }
    if (this.data.boardId) {
      this.form.patchValue({ boardId: this.data.boardId });
    }

    if(this.data.column){
      this.form.patchValue({boardColumnId: this.data.column.id})

    }
    
  }

  addTaskProperty() {
    this.taskProperty.push(
      new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        filedName: new FormControl(null, Validators.required),
        value: new FormControl(null, Validators.required),
        isRequired: new FormControl(null, Validators.required),
      })
    );
  }
  private getTask(taskId: number) {
    this.taskService
      .getTask(taskId)
      .pipe(takeUntil(this.sub$))
      .subscribe((task) => {
        this.form.patchValue(task);
        task.taskProperty.forEach((taskProperty: any) => {
          this.taskProperty.push(
            new FormGroup({
              id: new FormControl(taskProperty.id),
              name: new FormControl(taskProperty.name, Validators.required),
              filedName: new FormControl(
                taskProperty.filedName,
                Validators.required
              ),
              value: new FormControl(taskProperty.value, Validators.required),
              isRequired: new FormControl(
                taskProperty.isRequired,
                Validators.required
              ),
            })
          );
        });
      });
  }

  save() {
    this.form.markAllAsTouched();

    if (this.data.taskId) {
      this.taskService
        .updateTask(this.data.taskId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((task) => {
          
          this.dialogRef.close(task);
        });
    } else {
      this.taskService
        .createTask(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((task) => {
          
          this.dialogRef.close(task);
        });
    }
  }
  getIssueTypeProperties(issueTypeId: number) {
    this.issueTypeService
      .getIssueType(issueTypeId)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.taskProperty.clear();
        res.issueTypeColumns.forEach((property) => {
          this.taskProperty.push(
            new FormGroup({
              id: new FormControl(null),
              name: new FormControl(property.name),
              filedName: new FormControl(property.filedName),
              value: new FormControl(
                null,
                property.isRequired ? Validators.required : null
              ),
              isRequired: new FormControl(property.isRequired),
            })
          );
        });
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
