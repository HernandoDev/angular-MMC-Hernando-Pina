import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class LoginService {
  private api = environment.api.url;
  constructor(private http: HttpClient) {}
  /**
   * @description
   * Realiza una solicitud HTTP POST para obtener información sobre socios totales ademas valida si el token esta expirado.
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>} -  Un objeto Observable que emite la respuesta del servidor
   **/
  login(username: string, password: string) {
    const body = {
        username,
        password
    };
    const ruta = `${this.api}/login`;
    return this.http.post(ruta, body);
  }
}
