import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.scss'],
})
export class UserRoleDialogComponent {
  select = '';
  form: FormGroup = new FormGroup({
    roles: new FormControl('select', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<any>) {}

  onSubmit() {
    //console.log()(this.form);
  }
}
