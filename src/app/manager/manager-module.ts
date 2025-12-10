import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerLayout } from './layout/manager-layout/manager-layout';
import { ManagerSidebar } from './layout/manager-sidebar/manager-sidebar';
import { ManagerHeader } from './layout/manager-header/manager-header';
import { ManagerDashboardPage } from './components/manager-dashboard-page/manager-dashboard-page';
import { CourierListingPage } from './components/courier/courier-listing-page/courier-listing-page';
import { CourierCreatePage } from './components/courier/courier-create-page/courier-create-page';
import { CourierUpdatePage } from './components/courier/courier-update-page/courier-update-page';
import { Reports } from './components/reports/reports';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ManagerRoutingModule,
    ManagerLayout,
    ManagerSidebar,
    ManagerHeader,
    ManagerDashboardPage,
    CourierListingPage,
    CourierCreatePage,
    CourierUpdatePage,
    Reports
  ]
})
export class ManagerModule { }
