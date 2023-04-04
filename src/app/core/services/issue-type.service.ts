import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueType } from '../interfaces/issue-type';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService extends BaseService {

  getIssueTypes():Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type');
  }

  createIssueType(issueType: any): Observable<IssueType> {
    return this.post('issue-type', issueType);
  }

  updateIssueType(issueType: any): Observable<IssueType> {
    return this.put(`issue-type/${issueType.id}`, issueType);
  }

  deleteIssueType(id: number): Observable<IssueType> {
    return this.delete(`issue-type/${id}`);
  }
  

  getIssueType(id: number): Observable<IssueType> {
    return this.get(`issue-type/${id}`);
  }
}
