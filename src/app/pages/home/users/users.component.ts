import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { AddUsersComponent } from './add-users/add-users.component';
import { UserRoleDialogComponent } from './user-role-dialog/user-role-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'FullName', 'CreatedAt', 'Action'];
  dataSource: any;
  users: any;
  constructor(private userService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      //console.log()(res);
      this.users = res;
      this.dataSource = res;
      //console.log()(this.dataSource);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserRoleDialogComponent);
    return dialogRef;
    // dialogRef.afterClosed().subscribe(result => {
    //   //console.log()(`Dialog result: ${result}`);
    // });
  }
  openAddUsers() {
    const dialogRef = this.dialog.open(AddUsersComponent);
    return dialogRef;
  }
}
