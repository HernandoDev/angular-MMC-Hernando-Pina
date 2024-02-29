import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {
  private api = environment.api.url;

  constructor(private http: HttpClient) {}
  obtenerSociosTotales() {
    const ruta = `${this.api}/private/users?related=transactions`;
    return this.http.get(ruta);
  }
}
