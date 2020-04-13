import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, map, tap, delay } from 'rxjs/operators';

export interface User {
  name: string;
  heading: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _Http: HttpClient) {}
  redirectUrl: string;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  // Route Guard Setup
  userLogin(username, password) {
    console.log(username);
    const url = 'http://localhost/api/login.php';

    return this._Http.post(`${url}`, { username, password }).pipe(
      map(UserModule => {
        this.setToken(UserModule[0].name);
        this.getLoggedInName.emit(true);
        return UserModule;
      })
    );
  }

  //get Blog Messages
  getBlog(): Observable<any> {
    const url = 'http://localhost/api/getBlog.php';
    return this._Http
      .get(`${url}`)
      .pipe(
        tap(res => {
          console.log(res);
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Post blog message
  postBlog(message): Observable<any> {
    const url = 'http://localhost/api/postBlog.php';
    return this._Http
      .post(`${url}`, message)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Delete blog message
  DeleteBlog(id: any): Observable<any> {
    const params = new HttpParams().set('id', id.toLocaleString());
    const url = 'http://localhost/api/deleteBlog.php';
    return this._Http
      .delete(`${url}`, { params: params })
      .pipe(catchError(this.handleError));
    // return this._Http.delete(`${url}/?id=${id}`);
  }

  // Update message
  updateBlog(message): Observable<any> {
    console.log('Service', message);
    const url = 'http://localhost/api/updateBlog.php';
    return this._Http.put(`${url}`, message).pipe(catchError(this.handleError));
  }

  //Registration
  userRegistration(regData): Observable<any> {
    const url = 'http://localhost/api/register.php';
    console.log('service 1: ', regData);
    return this._Http
      .post<any>(`${url}`, regData)
      .pipe(
        map(res => {
          console.log('service 2: ', res);
          return res;
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  // Token setup
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const userToken = this.getToken();
    if (userToken != null) {
      return true;
    }
    return false;
  }
}

export class UserModule {
  public Id: number;
  public name: string;
  public surname: string;
  public email: string;
  public pwd: string;

  constructor(
    Id: number,
    name: string,
    surname: string,
    email: string,
    pwd: string
  ) {
    this.Id = Id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.pwd = pwd;
  }
}
