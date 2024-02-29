import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class uiUtils {


  constructor() { }

  static loading() {
    document.getElementById('cargando').style.display = 'flex';
  }
  static eliminarLoading() {
    document.getElementById('cargando').style.display = 'none';
  }
  static showToast(message: string, title: string, type: string = 'success') {
    var typeStyle
    // Configurar el estilo de la notificación según el valor de 'type'
    switch (type) {
      case 'success':
        typeStyle = 'bg-success text-white'
        break;
      case 'warning':
        typeStyle = 'bg-warning text-dark'
        break;
      case 'error':
        typeStyle = 'bg-danger text-white'
        break;
      default:
        typeStyle = 'bg-success text-white'
        break;
    }
    var toastHTML =
    `<div class="toast-container top-0 end-0 p-3 ">
          <div style='display:block!important' class="toast ${typeStyle}" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                  <strong class="me-auto">${title}</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                  ${message}
              </div>
          </div>
      </div>` ;

    var toastElement = document.createElement('div');
    toastElement.innerHTML = toastHTML;
    var toastNode = toastElement.firstChild as HTMLElement;
    document.body.appendChild(toastNode);
    var toast = new bootstrap.Toast(toastNode);
    toast.show();
  }
}

