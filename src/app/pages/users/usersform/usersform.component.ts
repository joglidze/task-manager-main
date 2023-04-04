import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/core/interfaces';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-usersform',
  templateUrl: './usersform.component.html',
  styleUrls: ['./usersform.component.scss'],
})
export class UsersformComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    identityNumber: new FormControl(null),
    isActive: new FormControl(true),
  });
  constructor(
    public dialogRef: MatDialogRef<any>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService
  ) {}
  userId = this.data.userId;

  ngOnInit(): void {
    if (this.data.userId) {
      this.userService.getUser(this.data.userId).subscribe((res) => {
        this.form.patchValue(res);
      });
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    if (this.data.userId) {
      this.userService
        .updateUser(this.form.value.id, this.form.value)
        .subscribe((res: IUser) => {
          //console.log()(res)
          this.dialogRef.close(res);
          this.userService.getAllUsers();
          //console.log()('updated user:');
        });
    } else {
      this.userService.createNewUsers(this.form.value).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }
}
