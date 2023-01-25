import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpAuthService } from 'src/app/core/services/http-auth/http-auth.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;

  constructor(private fb: FormBuilder,
    private httpAuth: HttpAuthService,
    public userLoginData: UserLoginDataService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.userLoginData.isUserLoggedIn) {
      this.router.navigate(['home']);
    }
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    });
  }

  onLogin() {
    const user = this.loginForm?.getRawValue();
    if (user) {
      this.httpAuth.login(user).subscribe({
          next: response => {
            this.userLoginData.token = 'Basic ' + btoa(`${user.username}:${user.password}`);
            this.userLoginData.userLoggedIn = response;
            this.router.navigate(['/home']);
            this.toastService.showToast({header: 'Logging in', message: `${this.userLoginData.userLoggedIn?.firstName} ${this.userLoginData.userLoggedIn?.lastName} logged in successfully`});
          },
          error: () => {
            this.toastService.showToast({header: 'Logging in', message: 'Bad credentials', className: 'bg-danger'})
          }
        }
      );
    }
  }

  
}
