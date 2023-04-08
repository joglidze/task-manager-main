import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../interfaces/pagination-response';
import { IRole } from '../interfaces/role';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService {
  createRole(role: IRole): Observable<IRole> {
    return this.post<IRole>('role', role);
  }

  getRole(id: string): Observable<IRole> {
    return this.get(`role/${id}`);
  }

  getUserRole(): Observable<IRole> {
    return this.get<IRole>('role/my');
  }

  getRoles(params = {}): Observable<PaginationResponse<IRole>> {
    return this.get('role', params);
  }

  getAllRoles(): Observable<IRole[]> {
    return this.get('role/all');
  }

  updateRole(id: string, role: IRole): Observable<IRole> {
    return this.put<IRole>(`role/${id}`, role);
  }

  deleteRole(id: string): Observable<IRole> {
    return this.delete<IRole>(`role/${id}`);
  }

  getPermissions(): Observable<any[]> {
    return this.get(`role/permission`);
  }

  setPermissions(params: {
    roleId: string;
    permissions: number[];
  }): Observable<any> {
    return this.post(`role/permissions`, params);
  }
}
