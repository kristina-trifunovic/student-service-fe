import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam, PageDto, PageRequest, Student, User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpExamService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${environment.serverUrl}/exams`);
  }

  findPage(pageRequest: PageRequest): Observable<PageDto<Exam>> {
    const params = new HttpParams()
          .set('pageNo', pageRequest.pageNo-1)
          .set('pageSize',pageRequest.pageSize )
          .set('sortBy', pageRequest.sortBy)
          .set('sortOrder', pageRequest.sortOrder)
    return this.httpClient.get<PageDto<Exam>>(`${environment.serverUrl}/exams/page`, {params});
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.httpClient.post<Exam>(`${environment.serverUrl}/exams`, exam, {responseType: 'text' as 'json'});
  }

  updateExam(exam: Exam): Observable<Exam> {
    return this.httpClient.put<Exam>(`${environment.serverUrl}/exams`, exam, {responseType: 'text' as 'json'});
  }

  applyExams(exams: Exam[], student: User): Observable<Student> {
    return this.httpClient.put<Student>(`${environment.serverUrl}/exams/${student.username}/apply`, exams, {responseType: 'text' as 'json'});
  }

  findAllExamsForStudentToApplyTo(username: string): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${environment.serverUrl}/exams/${username}/to-apply-to`);
  }
}
