import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRole } from 'src/app/core/interfaces/role';
import { RoleService } from 'src/app/core/services';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IUser } from 'src/app/core/interfaces';

@Component({
  selector: 'app-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss'],
})
export class UsersRolesComponent implements OnInit {
  roles: IRole[] = [];
  form: FormGroup = new FormGroup({
    roles: new FormControl('select', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    private roleService: RoleService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  onSubmit() {
    //console.log()(this.data.userId)
    if (this.form.invalid) {
      return;
    }
    const { roles } = this.form.value;
    //console.log()(roles)
    this.usersService
      .createUsersRoles({
        userId: this.data.userId,
        roleIds: roles,
      })
      .subscribe((res: IUser) => {
        this.toast.success({
          detail: 'Success Message',
          summary: 'User role was set successfully',
          duration: 4000,
        });
        this.dialogRef.close(res);
      });
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe((res) => {
      this.roles = res;
    });
  }
}
