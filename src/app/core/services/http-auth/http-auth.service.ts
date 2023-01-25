import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  constructor(private httpClient: HttpClient) { }

  login(user: {username: string, password: string}): Observable<User> {
    let params = new HttpParams();
    params = params.set("username", user.username);
    params = params.set("password", user.password);
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.post<User>(`${environment.serverUrl}/auth/login`, params, {headers});
  }
}
