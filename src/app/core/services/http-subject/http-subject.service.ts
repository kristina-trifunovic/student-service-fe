import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageDto, PageRequest, Professor, Subject, User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpSubjectService {

  constructor(private httpClient: HttpClient) { }

  findPage(pageRequest: PageRequest): Observable<PageDto<Subject>> {
    const params = new HttpParams()
          .set('pageNo', pageRequest.pageNo-1)
          .set('pageSize',pageRequest.pageSize )
          .set('sortBy', pageRequest.sortBy)
          .set('sortOrder', pageRequest.sortOrder)
    return this.httpClient.get<PageDto<Subject>>(`${environment.serverUrl}/subjects/page`, {params});
  }

  findAll(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${environment.serverUrl}/subjects`);
  }

  findById(id: number): Observable<Subject> {
    return this.httpClient.get<Subject>(`${environment.serverUrl}/subjects/${id}`);
  }

  deleteSubject(id: number): Observable<Subject> {
    return this.httpClient.delete<Subject>(`${environment.serverUrl}/subjects/${id}`, {responseType: 'text' as 'json'});
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(`${environment.serverUrl}/subjects`, subject, {responseType: 'text' as 'json'});
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(`${environment.serverUrl}/subjects`, subject, {responseType: 'text' as 'json'});
  }

  findSubjectsByProfessorId(username: string): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${environment.serverUrl}/subjects/${username}/subjects`);
  }

  findAllSubjectsWithNoProfessor(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${environment.serverUrl}/subjects/no-professors`);
  }

  findProfessorsBySubject(id: number): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(`${environment.serverUrl}/professors/subject/${id}/professors`);
  }

  uploadLiteratureToSubject(formData: FormData, subject: Subject | undefined) {
    return this.httpClient.post<Subject>(`${environment.serverUrl}/subjects/${subject?.id}/literature`, formData);    
  }
}
