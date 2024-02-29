import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { UserGuardGuard } from './guards/user-guard.guard';
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
        canActivate: [LoginGuardGuard] ,
        component: LoginComponent,
      },
      {
        path: 'admin',
        canActivate: [AdminGuardGuard] ,
        resolve: { socios: AdminResolver },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        canActivate: [UserGuardGuard] ,
        resolve: { socios: SociosResolver },
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
