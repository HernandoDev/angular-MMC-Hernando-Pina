import { Component, OnInit } from '@angular/core';
import { AdminService } from "./services/admin.service";
import { catchError } from 'rxjs';
import { uiUtils } from '../utils/ui.utils';
import { StorageUtil } from '../utils/storage.utils';
import { ActivatedRoute,Router } from '@angular/router';

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

  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    //Obtiene los datos del AdminResolver
    this.route.data.subscribe(data => {
      const res = data['socios'];
      this.listaSocios = res.data;
      this.total = res.totals.totals;
    });
  }

  /**
   * @description
   * Realiza una solicitud HTTP GET para obtener información sobre socios totales ademas valida si el token esta expirado.
   **/
  obtenerSociosTotales(){
    uiUtils.loading()
    this.adminService.obtenerSociosTotales().pipe(
      catchError(error => {
        uiUtils.eliminarLoading()
        if (error.error.error){
          uiUtils.showToast(error.error.error,'Error al obtener socios', 'error');
        }else if (error.error == "jwt expired"){
          // Retorna al login y elimina el LocalStorage
          StorageUtil.removeItem('user');
          StorageUtil.removeItem('token');
          this.router.navigate(['/login']);
          console.error('Error en la solicitud:', error);
          uiUtils.showToast('Error de conexión con el servidor','Sesión expirada, vuelve a iniciar sesión', 'error');
        }else{
          uiUtils.showToast('Error de conexión con el servidor','Error al insertar transaccion', 'error');
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
