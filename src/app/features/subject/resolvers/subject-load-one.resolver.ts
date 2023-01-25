import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subject } from 'src/app/core/models';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectLoadOneResolver implements Resolve<Subject> {

  constructor(private httpSubject: HttpSubjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subject> {
    const id = Number(route.paramMap.get('id'));
    return this.httpSubject.findById(id);
  }
}
