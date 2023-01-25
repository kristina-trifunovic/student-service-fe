import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamPeriod } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpExamPeriodService {

  constructor(private httpClient: HttpClient) { }

  addExamPeriod(examPeriod: ExamPeriod): Observable<ExamPeriod> {
    return this.httpClient.post<ExamPeriod>(`${environment.serverUrl}/exam-periods`, examPeriod, {responseType: 'text' as 'json'});
  }

  findAll(): Observable<ExamPeriod[]> {
    return this.httpClient.get<ExamPeriod[]>(`${environment.serverUrl}/exam-periods`);
  }

  findById(id: number): Observable<ExamPeriod> {
    return this.httpClient.get<ExamPeriod>(`${environment.serverUrl}/exam-periods/${id}`);
  }

  findActiveExamPeriod(): Observable<ExamPeriod> {
    return this.httpClient.get<ExamPeriod>(`${environment.serverUrl}/exam-periods/active`);
  }
}
