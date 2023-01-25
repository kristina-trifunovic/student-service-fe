import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageDto, PageRequest, Professor, Subject } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpProfessorService {

  constructor(private httpClient: HttpClient) { }

  findPage(pageRequest: PageRequest) {
    const params = new HttpParams()
          .set('pageNo', pageRequest.pageNo-1)
          .set('pageSize',pageRequest.pageSize )
          .set('sortBy', pageRequest.sortBy)
          .set('sortOrder', pageRequest.sortOrder)
    return this.httpClient.get<PageDto<Professor>>(`${environment.serverUrl}/professors/page`, {params});
  }

  findAll(): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(`${environment.serverUrl}/professors`);
  }

  findById(username: string | undefined | null): Observable<Professor> {
    return this.httpClient.get<Professor>(`${environment.serverUrl}/professors/${username}`);
  }

  deleteProfessor(professor: Professor): Observable<Professor> {
    return this.httpClient.delete<Professor>(`${environment.serverUrl}/professors/${professor.username}`, {responseType: 'text' as 'json'});
  }

  updateProfessor(professor: Professor): Observable<Professor> {
    return this.httpClient.put<Professor>(`${environment.serverUrl}/professors`, professor, {responseType: 'text' as 'json'});
  }

  addProfessor(professor: Professor): Observable<Professor> {
    return this.httpClient.post<Professor>(`${environment.serverUrl}/professors`, professor, {responseType: 'text' as 'json'});
  }
}
