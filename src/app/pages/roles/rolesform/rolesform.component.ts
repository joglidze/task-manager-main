import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rolesform',
  templateUrl: './rolesform.component.html',
  styleUrls: ['./rolesform.component.scss']
})
export class RolesformComponent implements OnInit{

  id = this.data.roleId
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<any>,

  ){}
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('',Validators.required)
  })

 ngOnInit(): void {
     if(this.data.roleId){
        this.roleService.getRole(this.data.roleId).subscribe(res => {
          this.form.patchValue(res);
        })
      }
 }

  submit(){
    this.form.markAllAsTouched()
    if(this.form.invalid){
      return
    }
    if(this.data.roleId){
      this.roleService.updateRole(this.form.value.id,this.form.value)
      .subscribe(res=>{
        this.dialogRef.close(res)
        this.roleService.getAllRoles()
      })
    }else{
      this.roleService.createRole(this.form.value)
      .subscribe(res=>{
        this.dialogRef.close(res)
      })
    }

   

  }
}
