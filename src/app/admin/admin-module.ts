import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersListingPage } from './components/admin-users/admin-users-listing-page/admin-users-listing-page';
import { AdminUsersCreatePage } from './components/admin-users/admin-users-create-page/admin-users-create-page';
import { AdminUsersUpdatePage } from './components/admin-users/admin-users-update-page/admin-users-update-page';
import { AdminDashboardPage } from './components/admin-dashboard-page/admin-dashboard-page';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { AdminDepartementListingPage } from './components/admin-departement/admin-departement-listing-page/admin-departement-listing-page';
import { AdminDepartementCreatePage } from './components/admin-departement/admin-departement-create-page/admin-departement-create-page';
import { AdminDepartementUpdatePage } from './components/admin-departement/admin-departement-update-page/admin-departement-update-page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    AdminUsersListingPage,
    AdminUsersCreatePage,
    AdminUsersUpdatePage,
    AdminDashboardPage,
    AdminLayout,
    Sidebar,
    Header,
    AdminDepartementListingPage,
    AdminDepartementCreatePage,
    AdminDepartementUpdatePage
  ]
})
export class AdminModule { }
