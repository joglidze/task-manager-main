import { Directive, ElementRef, OnInit } from '@angular/core';
import { RoleService } from '../core/services';

@Directive({
  selector: '[appRoles]',
})
export class RolesDirective implements OnInit {
  roles: any;
  constructor(private roleService: RoleService, private el: ElementRef) {}
  ngOnInit(): void {
    this.deleteDiv();
  }

  deleteDiv() {
    this.roleService.getUserRole().subscribe((res) => {
      this.roles = res;
      console.log(res)
      if (this.roles.length > 1) {
        return true;
      } else {
        return this.el.nativeElement.remove();
      }
    });
  }
}
