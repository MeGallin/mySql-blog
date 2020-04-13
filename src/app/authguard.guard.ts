import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { HttpService } from './services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private _Http: HttpService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeUrl: string = state.url;
    return this.isLogin(routeUrl);
  }

  isLogin(routeUrl: string) {
    if (this._Http.isLoggedIn()) {
      return true;
    }
    this._Http.redirectUrl = routeUrl;
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeUrl } });
  }
}
