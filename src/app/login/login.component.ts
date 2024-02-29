import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from "./services/login.service";
import { catchError } from 'rxjs';
import { StorageUtil } from '../utils/storage.utils';
import { uiUtils } from '../utils/ui.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = this.fb.group({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  public asyncError: boolean = false;
  constructor(
      private router: Router,
      private fb: FormBuilder,
      private loginService : LoginService,
    ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  public onSubmit() {
    uiUtils.loading();
    // console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(
      catchError(error => {
        // console.error('Error en el login', error);
        uiUtils.eliminarLoading()
        if (error.error.error){
          uiUtils.showToast(error.error.error,'Error al iniciar sesión', 'error');
        }else{
          uiUtils.showToast('Error de conexión con el servidor','Error al iniciar sesión', 'error');
        }
        throw error;
      })
    ).subscribe(
      (res: any) => {
        const isadmin = res.user.role.id == 1;
        StorageUtil.setItem('token', res.token);
        StorageUtil.setItem('user', res.user);
        let bodyToast = 'Bienvenido '+ res.user.username
        uiUtils.showToast(bodyToast, res.message, 'success');
        if (isadmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
        uiUtils.eliminarLoading()
      }
    );
  }
}
