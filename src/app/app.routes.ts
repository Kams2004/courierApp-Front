import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) },
  { path: 'manager', loadChildren: () => import('./manager/manager-module').then(m => m.ManagerModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
