import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterRequest, PageDto, PageRequest, Student } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpStudentService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.serverUrl}/cities`);
  }

  // findPage(pageRequest: PageRequest): Observable<PageDto<Student>> {
  //   const params = new HttpParams()
  //         .set('pageNo', pageRequest.pageNo-1)
  //         .set('pageSize',pageRequest.pageSize)
  //         .set('sortBy', pageRequest.sortBy)
  //         .set('sortOrder', pageRequest.sortOrder)
  //   return this.httpClient.get<PageDto<Student>>(`${environment.serverUrl}/students/page`, {params});
  // }

  findById(username: string | undefined): Observable<Student> {
    return this.httpClient.get<Student>(`${environment.serverUrl}/students/${username}`);
  }

  deleteStudent(student: Student): Observable<Student> {
    return this.httpClient.delete<Student>(`${environment.serverUrl}/students/${student.username}`, {responseType: 'text' as 'json'});
  }

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${environment.serverUrl}/students`, student, {responseType: 'text' as 'json'});
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${environment.serverUrl}/students`, student);
  }

  findPageFilteredStudents(filterRequest: FilterRequest, pageRequest: PageRequest): Observable<PageDto<Student>> {
    const params = new HttpParams()
      .set('firstName', filterRequest.firstName)
      .set('lastName',filterRequest.lastName)
      .set('email', filterRequest.email)
      .set('city', filterRequest.city)
      .set('pageNo', pageRequest.pageNo - 1)
      .set('pageSize', pageRequest.pageSize)
      .set('sortBy', pageRequest.sortBy)
      .set('sortOrder', pageRequest.sortOrder)
    return this.httpClient.get<PageDto<Student>>(`${environment.serverUrl}/students/filter`, {params});
  }
}
