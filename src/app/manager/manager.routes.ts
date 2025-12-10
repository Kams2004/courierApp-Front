import { Routes } from '@angular/router';
import { ManagerLayout } from './layout/manager-layout/manager-layout';
import { ManagerDashboardPage } from './components/manager-dashboard-page/manager-dashboard-page';
import { CourierListingPage } from './components/courier/courier-listing-page/courier-listing-page';
import { CourierCreatePage } from './components/courier/courier-create-page/courier-create-page';
import { Reports } from './components/reports/reports';

export const managerRoutes: Routes = [
  {
    path: '',
    component: ManagerLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ManagerDashboardPage },
      { path: 'couriers', component: CourierListingPage },
      { path: 'couriers/create', component: CourierCreatePage },
      { path: 'reports', component: Reports }
    ]
  }
];