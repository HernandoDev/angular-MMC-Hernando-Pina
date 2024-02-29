import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageUtil } from '../utils/storage.utils';
import { Router } from '@angular/router';
import { Util } from '../utils/util';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Util.isAdmin()) {
      return true;
    } else {
      if (Util.isUser()) {
        this.router.navigate(['/user']);
        return false;
      }else{
        this.router.navigate(['/login']);
        StorageUtil.removeItem('user');
        StorageUtil.removeItem('token');
        return false;
      }
    }
  }
}
