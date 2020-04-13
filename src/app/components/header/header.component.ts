import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser;
  loginButton: boolean;
  logoutButton: boolean;

  constructor(private _Http: HttpService) {}

  ngOnInit(): void {
    this._Http.getLoggedInName.subscribe(name => {
      this.changeName(name);
    });

    if (this._Http.isLoggedIn()) {
      console.log('loggedin');
      this.loginButton = false;
      this.logoutButton = true;
    } else {
      this.loginButton = true;
      this.logoutButton = false;
    }
    this.currentUser = localStorage.getItem('token');
  }

  private changeName(name: boolean): void {
    this.logoutButton = name;
    this.loginButton = !name;
  }

  logout() {
    this._Http.deleteToken();
    window.location.href = window.location.href;
  }
}
