import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(public userLoginData: UserLoginDataService,
    private router: Router) { }

  ngOnInit(): void {
  }

  showHomeButton(): boolean {
    return this.router.url === '/home' ? false : true;
  }

  logout() {
    this.userLoginData.logout();
    this.router.navigate(['/login']);
  }

}
