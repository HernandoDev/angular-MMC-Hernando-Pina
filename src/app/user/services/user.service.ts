import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private api = environment.api.url;

  obtenerTransacionesUsuario() {
    const ruta = `${this.api}/user?related=transactions`;
    return this.http.get(ruta);
  }
  insertarTransaccion(detail: string, amount: string) {
    const body = {
      detail,
      amount
    };
    const ruta = `${this.api}/user/transaction`;
    return this.http.post(ruta, body);
  }

}
