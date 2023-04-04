import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IEpic } from '../interfaces/epic';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class EpicsService extends BaseService {
  createEpic(epic: IEpic):Observable<IEpic> {
    return this.post<IEpic>('epics', epic);
  }


  getAllEpics():Observable<IEpic[]> {
    return this.get<IEpic[]>('epics');
  }

  getTarEpics(id:number){
    return this.get<any>(`epics/${id}`)
  }
   
  updateEpics(data: any): Observable<any> {
    return this.put<IEpic>(`epics/${data.id}`, data);
  }
 

  deleteEpics(id:number){
    return this.delete(`epics/${id}`)
  }

}
