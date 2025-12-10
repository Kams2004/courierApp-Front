import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { AdminDashboardPage } from './components/admin-dashboard-page/admin-dashboard-page';
import { AdminUsersListingPage } from './components/admin-users/admin-users-listing-page/admin-users-listing-page';
import { AdminUsersCreatePage } from './components/admin-users/admin-users-create-page/admin-users-create-page';
import { AdminUsersUpdatePage } from './components/admin-users/admin-users-update-page/admin-users-update-page';
import { AdminDepartementListingPage } from './components/admin-departement/admin-departement-listing-page/admin-departement-listing-page';
import { AdminDepartementCreatePage } from './components/admin-departement/admin-departement-create-page/admin-departement-create-page';
import { AdminDepartementUpdatePage } from './components/admin-departement/admin-departement-update-page/admin-departement-update-page';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardPage },
      { path: 'users', component: AdminUsersListingPage },
      { path: 'users/create', component: AdminUsersCreatePage },
      { path: 'users/update/:id', component: AdminUsersUpdatePage },
      { path: 'departements', component: AdminDepartementListingPage },
      { path: 'departements/create', component: AdminDepartementCreatePage },
      { path: 'departements/update/:id', component: AdminDepartementUpdatePage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }