import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "../admin/services/admin.service";

@Injectable()
export class AdminResolver implements Resolve<any> {
  constructor(private adminService: AdminService) {}

  resolve(): Observable<any> {
    return this.adminService.obtenerSociosTotales();
  }
}
