import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class LoginService {
  private api = environment.api.url;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = {
        username,
        password
    };
    const ruta = `${this.api}/login`;
    return this.http.post(ruta, body);
  }
}
