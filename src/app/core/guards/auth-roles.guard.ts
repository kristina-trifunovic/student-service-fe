import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast/toast.service';
import { UserLoginDataService } from '../services/user-login-data/user-login-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRolesGuard implements CanActivate {

  constructor(private userLoginData: UserLoginDataService,
    private router: Router,
    private toastService: ToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: string[] = route.data['roles'] as string[];
    const roleExists = this.userLoginData.userLoggedIn?.authorities.some( authority => roles.includes(authority.authority));
    if (!this.userLoginData.isUserLoggedIn) {
      this.toastService.showToast({header: 'Login error', message: 'Please login first', className: 'bg-danger'});
      return this.router.parseUrl('/login');
    } else if (!roleExists) {
      this.toastService.showToast({header: 'Authorization error', message: 'You are not authorized to proceed', className: 'bg-danger'});
      return false;
    }
    return true;
  }
  
}
