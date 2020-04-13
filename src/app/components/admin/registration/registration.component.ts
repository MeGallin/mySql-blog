import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  angForm: FormGroup;
  public errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private _Http: HttpService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email]
      ],
      pwd: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  postData(regData: NgForm) {
    // console.log(regData);
    // console.log(JSON.stringify(regData));
    this._Http.userRegistration(JSON.stringify(regData)).subscribe(
      res => {
        // console.log('Registration form done', res);
        this.router.navigate(['dashboard']);
        return res;
      },
      err => {
        // console.log(parseInt(err));
        if (parseInt(err) === 200) {
          this.errorMessage = 'Email address already exists!';
        } else {
          this.router.navigate(['dashboard']);
        }

        return err;
      }
    );
  }
}
