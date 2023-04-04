import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService extends BaseService {
  getTasks(params = {}): Observable<ITask[]> {
    return this.get<ITask[]>('task', params);
  }
  getTask(id: number):Observable<ITask> {
    return this.get<ITask>(`task/${id}`);
  }
  createTask(data: any):Observable<ITask> {
    return this.post<ITask>('task', data);
  }
  updateTask(id: number, data: any):Observable<ITask> {
    return this.put<ITask>(`task/${id}`, data);
  }
  deleteTask(id: number) {
    return this.delete<ITask>(`task/${id}`);
  }

}
