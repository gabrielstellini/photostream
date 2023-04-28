import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./photo-container/photo-container.component').then(
        (m) => m.PhotoContainerComponent
      ),
  },
  {
    path: 'favourites',
    pathMatch: 'full',
    loadComponent: () =>
      import('./favourites-container/favourites-container.component').then(
        (m) => m.FavouritesContainerComponent
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
