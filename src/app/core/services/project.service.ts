import { IProject } from './../interfaces/project';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '../interfaces/pagination-response';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  //create project
  createProject(project: IProject): Observable<IProject> {
    return this.post<IProject>('project', project);
  }

  //get project http calls
  getProjects(): Observable<PaginationResponse<IProject>> {
    return this.get<PaginationResponse<IProject>>('project');
  }

  getMyProjects(): Observable<IProject[]> {
    return this.get<IProject[]>('project/my');
  }

  getProjectId(id: number): Observable<IProject> {
    return this.get<IProject>(`project/${id}`);
  }

  getAllProjects(): Observable<IProject[]> {
    return this.get<IProject[]>('project/All');
  }

  getProjectUsers(): Observable<IUser[]> {
    return this.get<IUser[]>('project/users');
  }

  getAllProjectsWithBoards(){
    return this.get<any>('project/withBoards')
  }

  addUserProject(data: {
    projectId: number;
    userIds: number[];
  }): Observable<any> {
    return this.post(`project/users`, data);
  }


}
