import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { BoardService } from 'src/app/core/services/board.service';

import { BoardFormService } from 'src/app/core/services/board-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent implements OnInit, OnDestroy {
  boardForm!: FormGroup;
  fullProjectId!: any;
  boardId: any;
  constructor(
    private fb: FormBuilder,
    private Board: BoardService,

    private activatedRoute: ActivatedRoute,

    private router: Router
  ) {}

  backgroundColor: string[] = [];
  backgroundImg: string[] = [];

  color = '';
  background =
    'https://plus.unsplash.com/premium_photo-1674752365557-166d7edc8081?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80';

  sub$ = new Subject();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.boardId = res;
      //console.log()(this.boardId);
    });

    this.boardForm = this.fb.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      position: new FormControl(0),
      columns: this.fb.array([]),
    });
    if (this.boardId.id) {
      this.editFillForm();
    }
  }
  get columnArr() {
    return this.boardForm.controls['columns'] as FormArray;
  }

  addColumn() {
    this.columnArr.push(
      new FormGroup({
        id: new FormControl(null, Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        position: new FormControl(
          this.columnArr.length + 1,
          Validators.required
        ),
        taskStatus: new FormControl('', Validators.required),
      })
    );
  }

  onDelete() {}

  editFillForm() {
    return this.Board.getTarBoard(this.boardId.id)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.boardForm.patchValue(res);
        res.columns.forEach((column) => {
          this.columnArr.push(
            new FormGroup({
              id: new FormControl(column.id, Validators.required),
              name: new FormControl(column.name, Validators.required),
              description: new FormControl(
                column.description,
                Validators.required
              ),
              position: new FormControl(
                this.columnArr.length + 1,
                Validators.required
              ),
              taskStatus: new FormControl(
                column.taskStatus,
                Validators.required
              ),
            })
          );
        });
      });
  }

  onSubmit() {
    if (!this.boardId.id) {
      this.Board.addBoard(this.boardForm.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          this.fullProjectId = res.id;
          this.router.navigate(['/project/setting/boards']);
          //console.log()(this.fullProjectId);
        });
    } else {
      this.boardForm.value.id = this.boardId.id;
      //console.log()('update');

      this.Board.updateBoard(this.boardForm.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          //console.log()(res);
          this.router.navigate(['/project/setting/boards']);
        });
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
