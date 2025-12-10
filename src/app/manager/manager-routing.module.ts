import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerLayout } from './layout/manager-layout/manager-layout';
import { ManagerDashboardPage } from './components/manager-dashboard-page/manager-dashboard-page';
import { CourierListingPage } from './components/courier/courier-listing-page/courier-listing-page';
import { CourierCreatePage } from './components/courier/courier-create-page/courier-create-page';
import { CourierUpdatePage } from './components/courier/courier-update-page/courier-update-page';
import { Reports } from './components/reports/reports';

const routes: Routes = [
  {
    path: '',
    component: ManagerLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ManagerDashboardPage },
      { path: 'couriers', component: CourierListingPage },
      { path: 'couriers/create', component: CourierCreatePage },
      { path: 'couriers/update/:id', component: CourierUpdatePage },
      { path: 'reports', component: Reports }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }