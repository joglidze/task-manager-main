import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IssueType } from 'src/app/core/interfaces';
import { IssueTypeService } from 'src/app/core/services/issue-type.service';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Component({
  selector: 'app-project-issuetypes',
  templateUrl: './project-issuetypes.component.html',
  styleUrls: ['./project-issuetypes.component.scss'],
})
export class ProjectIssuetypesComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<IssueType>();

  sub$ = new Subject();
  fullProjectId: any;
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  constructor(
    private issuetypeSrv: IssueTypeService,
    private router: Router,
    private projectFacadeSrv: ProjectFacadeService
  ) {}
  loader = true;

  ngOnInit(): void {
    this.getIssueTypes();

    this.fullProjectId = this.projectFacadeSrv.getProject().id;
    //console.log()(this.fullProjectId);
  }

  getIssueTypes() {
    this.issuetypeSrv
      .getIssueTypes()
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
  onIssueType() {
    this.router.navigate(['project/setting/issueTypesForm/add']);
  }

  onDelete(id: any) {
    this.issuetypeSrv.deleteIssueType(id).subscribe((res) => {
      //console.log()(res);
      if (res) {
        this.getIssueTypes();
      }
    });
  }
}
