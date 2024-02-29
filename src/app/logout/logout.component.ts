import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageUtil } from '../utils/storage.utils';
import { uiUtils } from '../utils/ui.utils';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private routeService: Router) {}

  ngOnInit(): void {}
  /**
   * @description
   * Realiza el proceso de cerrar sesion y eliminar los datos del LocalStorage ademas de redirigir al login
   **/
  public logout() {
    let user = StorageUtil.getItem('user')
    this.routeService.navigate(['/login']);
    StorageUtil.removeItem('user');
    StorageUtil.removeItem('token');
    uiUtils.showToast('Hasta pronto '+user.username+', regresando al login...','Sesión cerrada exitosamente','success')
  }
}
