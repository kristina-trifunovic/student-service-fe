import { Injectable } from '@angular/core';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserLoginDataService {
  private user?: User;

  constructor() {
    const userLoggedIn = this.storage.getItem('userData');
    if (userLoggedIn) {
      this.user = JSON.parse(userLoggedIn);
    }
  }

  get userLoggedIn() {
    return this.user;
  }

  set userLoggedIn(user: User | undefined) {
    this.user = user;
    this.storage.setItem('userData', JSON.stringify(user));
  }

  get storage() {
    return localStorage;
  }

  get token() {
    return this.storage.getItem('token');
  }

  set token(token: string | null) {
    if (token) {
      this.storage.setItem('token', token);
    } else {
      this.storage.removeItem('token');
    }
  }
  
  logout() {
    this.userLoggedIn = undefined;
    this.storage.removeItem('userData');
    this.storage.removeItem('token');
  }

  get isUserLoggedIn(): boolean {
    return this.storage.getItem('userData') === JSON.stringify(this.user) ? true : false;
  }
}
