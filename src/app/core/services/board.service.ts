import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../interfaces/board';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends BaseService {
  addBoard(board: IBoard): Observable<IBoard> {
    return this.post<IBoard>('board', board);
  }
  
  getboard(): Observable<IBoard[]> {
    return this.get<IBoard[]>('board');
  }
  
  getTarBoard(id: number): Observable<IBoard> {
    return this.get<any>(`board/${id}`);
  }

  
  updateBoard(data: any): Observable<IBoard> {
    return this.put<IBoard>(`board/${data.id}`, data);
  }
  
  deleteBoard(id: number): Observable<any> {
    return this.delete(`board/${id}`);
  }
}
