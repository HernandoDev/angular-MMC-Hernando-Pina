import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { uiUtils } from '../utils/ui.utils';
import { UserService } from "./services/user.service";
import { catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private fb: FormBuilder,private userService:UserService,private route:ActivatedRoute) {}
  public transaciones;
  public total:number;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const res = data['socios'];
      this.transaciones = res.transactions;
      this.sumarAmounts(this.transaciones)
    });
  }
  ngOnDestroy(): void {}

  sumarAmounts(transacciones: any[]) {
    this.total = transacciones.reduce((suma, transaccion) => suma + transaccion.amount, 0);
  }
  obtenerTransacionesUsuario(){
    uiUtils.loading()
    this.userService.obtenerTransacionesUsuario().pipe(
      catchError(error => {
        uiUtils.eliminarLoading()
        if (error.error.error){
          uiUtils.showToast(error.error.error,'Error al obtener transacciones', 'error');
        }else{
          uiUtils.showToast('Error de conexión con el servidor','Error al obtener transacciones', 'error');
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

  validarAmount(amount){
    amount = parseInt(amount)
    if (isNaN(amount) || amount < 0) {
      console.log("El valor ingresado no es válido. Por favor, ingresa un número mayor o igual a cero.");
      return false
    } else {
      return true
    }
  }

  public onSubmit() {
    uiUtils.loading()
    let amountValido = this.validarAmount(this.transactionForm.value.amount)
    if(amountValido){
      this.userService.insertarTransaccion(this.transactionForm.value.detail,this.transactionForm.value.amount).pipe(
        catchError(error => {
          uiUtils.eliminarLoading()
          if (error.error.error){
            uiUtils.showToast(error.error.error,'Error al obtener transaccion', 'error');
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
