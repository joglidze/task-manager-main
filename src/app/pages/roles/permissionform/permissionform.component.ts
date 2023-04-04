import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/core/services';
import * as _ from 'lodash';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-permissionform',
  templateUrl: './permissionform.component.html',
  styleUrls: ['./permissionform.component.scss'],
})
export class PermissionformComponent implements OnInit {
  groups: any = [];
  permissions: Set<number> = new Set<number>();
  roleId!: string;

  constructor(
    private permissionService: RoleService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private toastService: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['roleId']) {
        this.roleId = params['roleId'];
        this.getPermissionsByRole();
      }
    });
    this.getPermissions();
  }

  getPermissionsByRole() {
    this.roleService.getRole(this.roleId).subscribe((res) => {
      //console.log()(res)

      this.permissions = new Set<number>(
        res.permissions.map((prmss: any) => prmss.id)
      );
    });
  }

  getPermissions() {
    this.permissionService.getPermissions().subscribe((permissions) => {
      const grouped = _.groupBy(permissions, 'groupKey');
      this.groups = Object.keys(grouped).map((key) => {
        return {
          key,
          permissions: grouped[key],
        };
      });
    });
  }

  checkPermission(permission: any) {
    this.permissions.has(permission.id)
      ? this.permissions.delete(permission.id)
      : this.permissions.add(permission.id);
  }

  savePermission() {
    this.roleService
      .setPermissions({
        roleId: this.roleId,
        permissions: Array.from(this.permissions),
      })
      .subscribe((res) => {
        this.toastService.success({
          detail: 'SUCCESS MESSAGE',
          summary: 'Permission successfully saved',
        });
        this.router.navigate(['roles']);
        //console.log()(res)
      });
  }
}
