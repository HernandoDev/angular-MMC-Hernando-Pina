import { Component, OnInit } from '@angular/core';
import { AdminService } from "./services/admin.service";
import { catchError } from 'rxjs';
import { uiUtils } from '../utils/ui.utils';
import { ActivatedRoute } from '@angular/router';

interface Socio {
  id: number;
  lastTransaction: string;
  totalAmount: string;
  totalTransactions:string;
  username:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  public listaSocios: Socio[] = [];
  public total : number;

  constructor(private adminService:AdminService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const res = data['socios'];
      this.listaSocios = res.data;
      this.total = res.totals.totals;
    });
  }

  obtenerSociosTotales(){
    uiUtils.loading()
    this.adminService.obtenerSociosTotales().pipe(
      catchError(error => {
        uiUtils.eliminarLoading()
        if (error.error.error){
          uiUtils.showToast(error.error.error,'Error al obtener socios', 'error');
        }else{
          uiUtils.showToast('Error de conexión con el servidor','Error al obtener socios', 'error');
        }
        throw error;
      })
    ).subscribe(
      (res: any) => {
        uiUtils.eliminarLoading()
        this.listaSocios = res.data
        this.total = res.totals.totals
      }
    );
  }
}
