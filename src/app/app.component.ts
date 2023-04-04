import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  
  <router-outlet ></router-outlet>  
            <lib-ng-toast></lib-ng-toast>
  `
})
export class AppComponent {
  title = 'ng-nest';
}
