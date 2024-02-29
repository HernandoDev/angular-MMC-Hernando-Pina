import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { uiUtils } from '../utils/ui.utils';
import { StorageUtil } from '../utils/storage.utils';
import { UserService } from "./services/user.service";
import { catchError } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public transactionForm = this.fb.group({
    amount: new FormControl(''),
    detail: new FormControl(''),
  });
  constructor(private fb: FormBuilder,private userService:UserService,private route:ActivatedRoute,private router: Router) {}
  public transaciones;
  public total:number;
  ngOnInit(): void {
    // Obtiene los datos del socioResolver
    this.route.data.subscribe(data => {
      const res = data['socios'];
      this.transaciones = res.transactions;
      this.sumarAmounts(this.transaciones)
    });
  }
  ngOnDestroy(): void {}

  //Suma los amounts de las transacciones existentes
  sumarAmounts(transacciones: any[]) {
    this.total = transacciones.reduce((suma, transaccion) => suma + transaccion.amount, 0);
  }

  /**
   * @description
   * Consulta los datos de transaccion de un usuario HTTP GET
   *
   **/
  obtenerTransacionesUsuario(){
    uiUtils.loading()
    this.userService.obtenerTransacionesUsuario().pipe(
      catchError(error => {
        uiUtils.eliminarLoading()
        if (error.error.error){
          uiUtils.showToast(error.error.error,'Error al obtener transacciones', 'error');
        }else if (error.error == "jwt expired"){
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
        this.transaciones = res.transactions
        this.sumarAmounts(this.transaciones)
      }
    );
  }

  // Valida si el amount que se va a enviar para insertar tiene un formato valido
  validarAmount(amount){
    amount = parseInt(amount)
    if (isNaN(amount) || amount < 0) {
      console.log("El valor ingresado no es válido. Por favor, ingresa un número mayor o igual a cero.");
      return false
    } else {
      return true
    }
  }

  //Inserta una nueva transaccion mediante una peticion HTTP POST asociada al usuario que esta con la sesion activa
  public onSubmit() {
    uiUtils.loading()
    let amountValido = this.validarAmount(this.transactionForm.value.amount)
    if(amountValido){
      this.userService.insertarTransaccion(this.transactionForm.value.detail,this.transactionForm.value.amount).pipe(
        catchError(error => {
          debugger
          uiUtils.eliminarLoading()
          if (error.error.error){
            uiUtils.showToast(error.error.error,'Error al obtener transaccion', 'error');
          }else if (error.error == "jwt expired"){
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
          uiUtils.showToast(res.message,'Operacion exitosa', 'success');
          this.obtenerTransacionesUsuario()
        }
      );
    }else{
      uiUtils.eliminarLoading()
      uiUtils.showToast('Amount no es válido','Error', 'error');
    }

  }
}
