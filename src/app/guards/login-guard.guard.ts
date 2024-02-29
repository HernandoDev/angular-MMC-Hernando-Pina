import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageUtil } from '../utils/storage.utils';
import { Router } from '@angular/router';
import { Util } from '../utils/util';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router) { }
  /**
   * @description
   * Valida si el usuario que quiere acceder a la vista /login no tiene ya una sesion iniciada
   * Si el usuario que trata de acceder es un usuario coustumer redirigira a la ruta /user
   * Si el usuario que trata de acceder es un usuario admin redirigira a la ruta /admin
   *
   * @returns {Boolean}
   **/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Util.isAdmin()) {
      this.router.navigate(['/admin']);
      return false;
    }else if (Util.isUser()) {
      this.router.navigate(['/user']);
      return false;
    }else {
      return true;
    }
  }
}
