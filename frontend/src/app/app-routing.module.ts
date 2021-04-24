import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home', loadChildren:  () => import('./home/home.module').then(m => m.HomeModule) 
  },
  {
    path: '', redirectTo: 'auth', pathMatch: 'full' 
  },
  {
    path: 'auth', loadChildren:  () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: 'user', loadChildren:  () => import('./user/user.module').then(m => m.UserModule) 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
