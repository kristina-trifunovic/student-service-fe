import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models';
import { HttpStudentService } from 'src/app/core/services/http-student/http-student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentLoadOneResolver implements Resolve<Student> {

  constructor(private httpStudent: HttpStudentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student> {
    const username = route.paramMap.get('username')!;
    return this.httpStudent.findById(username);
  }
}
