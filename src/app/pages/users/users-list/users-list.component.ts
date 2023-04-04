import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { RoleService } from 'src/app/core/services';
import { UsersService } from 'src/app/core/services/users.service';
import { UsersRolesComponent } from '../users-roles/users-roles.component';
import { UsersformComponent } from '../usersform/usersform.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  loader: boolean = true;
  allUsers$: Observable<IUser[]> = this.userService.getAllUsers();
  displayedColumns: string[] = ['Id', 'FullName', 'CreatedAt', 'Action'];
  dataSource = new MatTableDataSource<IUser>();

  users: any;
  constructor(
    private userService: UsersService,
    public dialog: MatDialog,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      //console.log()(res);
      this.getAllUsers();
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(UsersRolesComponent, {
      data: {
        userId: id,
      },
    });
  }

  addEditUser(id?: number) {
    const dialogRef = this.dialog.open(UsersformComponent, {
      data: {
        userId: id,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getAllUsers();
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      //console.log()(res);
      this.users = res;
      this.dataSource.data = res;
      this.loader = false;
    });
  }
}
