import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { PhotoStoreModule } from '../store/photo/photo-store.module';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./photos-container/photos-container.component').then(
        (m) => m.PhotosContainerComponent
      ),
    providers: [importProvidersFrom(PhotoStoreModule)],
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
