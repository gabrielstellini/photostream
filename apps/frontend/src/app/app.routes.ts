import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // {
  //   path: 'dashboard',
  //   pathMatch: 'full',
  //   loadComponent: () =>
  //     import('./dashboard/dashboard.component').then(
  //       (mod) => mod.DashboardComponent
  //     ),
  // },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];
