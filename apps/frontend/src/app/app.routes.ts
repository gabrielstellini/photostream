import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { PhotoStoreModule } from '../store/photo/photo-store.module';
import { FavouriteStoreModule } from '../store/favourite/favourite-store.module';

export const appRoutes: Route[] = [
  {
    providers: [importProvidersFrom(FavouriteStoreModule)],
    path: 'favourites',
    pathMatch: 'full',
    loadComponent: () =>
      import('./favourites-container/favourites-container.component').then(
        (m) => m.FavouritesContainerComponent
      ),
  },
  {
    path: 'photos',
    providers: [importProvidersFrom(PhotoStoreModule)],
    children: [
      {
        providers: [importProvidersFrom(FavouriteStoreModule)],
        path: ':id',
        loadComponent: () =>
          import('./photo-container/photo-container.component').then(
            (m) => m.PhotoContainerComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./photos-container/photos-container.component').then(
            (m) => m.PhotosContainerComponent
          ),
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '/photos' },
];
