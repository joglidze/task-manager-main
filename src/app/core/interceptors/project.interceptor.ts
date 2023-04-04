import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectService } from '../services';
import { ProjectFacadeService } from 'src/app/facades/project.service';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(private projectFacadeService: ProjectFacadeService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const localProject = this.projectFacadeService.getProject();
    if (localProject) {
      request = request.clone({
        setHeaders: {
          project: localProject.id.toString(),
        },
      });
    }
    
    return next.handle(request);
  }
}
