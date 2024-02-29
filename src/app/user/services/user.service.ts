import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private api = environment.api.url;
  /**
   * @description
   * Consulta los datos de transaccion de un usuario HTTP GET
   *
   * @returns {Observable<any>} - Un objeto Observable que emite la respuesta del servidor
   **/
  obtenerTransacionesUsuario() {
    const ruta = `${this.api}/user?related=transactions`;
    return this.http.get(ruta);
  }
  /**
   * @description
   * Inserta una nueva transaccion mediante una peticion HTTP POST asociada al usuario que esta con la sesion activa
   *
   * @param {string} detail - [Descripción del primer parámetro].
   * @param {string} amount - [Descripción del segundo parámetro].
   * @returns {Observable<any>} - Un objeto Observable que emite la respuesta del servidor
   **/
  insertarTransaccion(detail: string, amount: string) {
    const body = {
      detail,
      amount
    };
    const ruta = `${this.api}/user/transaction`;
    return this.http.post(ruta, body);
  }

}
