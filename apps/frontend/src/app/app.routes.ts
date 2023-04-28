import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { UserStoreModule } from '../store/user/user-store.module';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
    providers: [importProvidersFrom(UserStoreModule)],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];
