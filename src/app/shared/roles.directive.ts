import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService, RoleService } from '../core/services';

@Directive({
  selector: '[appRoles]',
})
export class RolesDirective implements OnInit {
  roles: any;
  constructor(private authService: AuthService, private el: ElementRef) {}
  ngOnInit(): void {
    this.deleteDiv();
  }

  deleteDiv() {
    this.roles = this.authService.getUser()?.roles[0];

    console.log(this.roles.name);

    if (this.roles.name == 'Super Admin') {
      return true;
    } else {
      return this.el.nativeElement.remove();
    }
  }
}
