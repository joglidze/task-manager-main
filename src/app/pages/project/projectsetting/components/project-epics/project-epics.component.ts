import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { IEpic } from 'src/app/core/interfaces/epic';
import { EpicsService } from 'src/app/core/services/epics.service';

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss'],
})
export class ProjectEpicsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<IEpic>();
  loader = true;
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];
  sub$ = new Subject();

  constructor(private epicsSrc: EpicsService) {}
  ngOnInit(): void {
    this.getEpics();
  }

  getEpics() {
    this.epicsSrc
      .getAllEpics()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.loader = false;
        this.dataSource.data = res;
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  onDelete(elementId: number) {
    this.epicsSrc.deleteEpics(elementId).subscribe((res) => {
      if (res) {
        this.getEpics();
      }
      //console.log()(res);
    });
  }
}
