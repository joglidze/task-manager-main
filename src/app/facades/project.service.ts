import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { IProject } from '../core/interfaces/project';
import { ProjectService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class ProjectFacadeService {
  // currentProject?: IProject = this.projectFacadeService.getProject()
  myProjects: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);
  myProjects$ = this.myProjects.asObservable();
  
  constructor(
    private projectService: ProjectService
  ) { }

  setProject(projectId: number){
    this.projectService.getProjectId(projectId).subscribe(
      (project)=>{
        localStorage.setItem('project',JSON.stringify(project))
      }
    )
  }

  getProject(): IProject{
    const project = localStorage.getItem('project');
   return project? JSON.parse(project) : null
  }

  getMyProjects():Observable<IProject[]>{
    return this.projectService.getMyProjects()
    .pipe(
     tap( projects => this.myProjects.next(projects)))
   }
 }

