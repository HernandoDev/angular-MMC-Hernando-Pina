import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// Guards
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { UserGuardGuard } from './guards/user-guard.guard';
// Resolvers
import { SociosResolver } from './resolvers/socios.resolver';
import { AdminResolver } from './resolvers/admin.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        canActivate: [LoginGuardGuard] ,//Validara si el usuario no tiene la sesion activa , si es asi redirigira a la url que le corresponde
        component: LoginComponent,
      },
      {
        path: 'admin',
        canActivate: [AdminGuardGuard] , //Valida si el usuario es un admin, si es un usuario normal sera redirigido a su ventana, si no tiene sesion activa ira al login
        resolve: { socios: AdminResolver }, //Precarga los datos de los usuarios y sus transacciones antes de cargar el componente
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        canActivate: [UserGuardGuard] , //Valida si el usuario es un coustumer, si es un usuario admin sera redirigido a su ventana, si no tiene sesion activa ira al login
        resolve: { socios: SociosResolver }, //Precarga los datos de las transacciones correspondiente al usuario antes de cargar el componente
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
