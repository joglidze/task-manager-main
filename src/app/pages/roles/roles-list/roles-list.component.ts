import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { IRole } from 'src/app/core/interfaces/role';
import { RoleService } from 'src/app/core/services';
import { RolesformComponent } from '../rolesform/rolesform.component';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent implements OnInit {
  loader = true;
  pageIndex = 1;
  total = 0;
  pageSize = 10;
  displayedColumns: string[] = ['Id', 'FullName', 'CreatedAt', 'Action'];
  dataSource = new MatTableDataSource<IRole>();

  sub$ = new Subject();

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  getAllRoles() {
    this.roleService
      .getRoles({
        page: this.pageIndex,
        limit: this.pageSize,
      })
      .subscribe((roles) => {
        //console.log()(roles)
        this.dataSource.data = roles.data;
        //console.log()(roles.data)
        this.total = roles.totalCount;
        this.loader = false;
      });
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  addEditRole(id?: number) {
    const dialogRef = this.dialog.open(RolesformComponent, {
      data: {
        roleId: id,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getAllRoles();
    });
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe((res) => {
      this.getAllRoles();
    });
  }

  pageEvent($event: PageEvent) {
    //console.log()($event)
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getAllRoles();
  }
}
