import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _Http: HttpService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email]
      ],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  postData(angForm1) {
    console.log(angForm1.value.email);
    this._Http
      .userLogin(angForm1.value.email, angForm1.value.password)
      .subscribe(
        data => {
          const redirect = this._Http.redirectUrl ? this._Http.redirectUrl : '';
          this.router.navigate([redirect]);
        },
        error => {
          alert('User name or password is incorrect');
        }
      );
  }
  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
}
