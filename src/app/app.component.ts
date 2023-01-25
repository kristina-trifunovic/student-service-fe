import { Component, OnInit } from '@angular/core';
import { User } from './core/models';
import { UserLoginDataService } from './core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Student service';

  constructor() { }

  ngOnInit(): void {
  }
}
