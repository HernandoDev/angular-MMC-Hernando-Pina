import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../user/services/user.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { uiUtils } from '../utils/ui.utils';
import { StorageUtil } from '../utils/storage.utils';
import { Router } from '@angular/router';

@Injectable()
export class SociosResolver implements Resolve<any> {
  constructor(private userService: UserService,private router: Router) {}

  resolve(): Observable<any> {
    return this.userService.obtenerTransacionesUsuario()
    .pipe(
      catchError(error => {
        StorageUtil.removeItem('user');
        StorageUtil.removeItem('token');
        this.router.navigate(['/login']);
        console.error('Error en la solicitud:', error);
        uiUtils.showToast('Error de conexión con el servidor','Sesión expirada, vuelve a iniciar sesión', 'error');
        return of(null);
      })
    );
  }
}
