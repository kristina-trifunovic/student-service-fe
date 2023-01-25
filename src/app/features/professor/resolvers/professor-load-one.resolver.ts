import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Professor } from 'src/app/core/models';
import { HttpProfessorService } from 'src/app/core/services/http-professor/http-professor.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorLoadOneResolver implements Resolve<Professor> {

  constructor(private httpProfessor: HttpProfessorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Professor> {
    const username = route.paramMap.get('username');
    return this.httpProfessor.findById(username);
  }
}
