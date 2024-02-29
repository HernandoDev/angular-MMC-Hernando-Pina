import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Util } from '../utils/util';
import { Router } from '@angular/router';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(private router: Router) { }
  /**
   * @description
   * Valida si el usuario que quiere acceder a la vista /user es realmente un usuario admin
   * Si el usuario que trata de acceder es un usuario admin redirigira a la ruta /admin
   * Si no cumple ninguna de esas condiciones redigira al login
   *
   * @returns {Boolean}
   **/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Util.isUser()) {
      return true;
    } else {
      if (Util.isAdmin()) {
        this.router.navigate(['/admin']);
        return false
      }else{
        this.router.navigate(['/login']);
        StorageUtil.removeItem('user');
        StorageUtil.removeItem('token');
        return false;
      }
    }
  }

}
