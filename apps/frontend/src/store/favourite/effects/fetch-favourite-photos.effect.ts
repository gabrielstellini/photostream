import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  fetchFavouritePhotos,
  fetchFavouritePhotosFail,
  fetchFavouritesPhotosSuccess,
} from '../actions/fetch-favourite-photos.actions';
import { FavouriteBackend } from '../services/favourite-backend.service';
import { PhotoBackend } from '../../photo/services/photo-backend.service';

@Injectable()
export class FetchFavouritePhotosEffect {
  public fetchFavouritePhotos$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchFavouritePhotos),
        mergeMap(() => {
          return this.favouritesBackend.fetchFavourites().pipe(
            switchMap((favourites) =>
              this.photosBackend.getPhotosById(favourites)
            ),
            map((favouritePhotos) =>
              fetchFavouritesPhotosSuccess({
                payload: favouritePhotos,
              })
            )
          );
        }),
        catchError(() => of(fetchFavouritePhotosFail()))
      )
  );

  public fetchFavouritePhotosFail$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchFavouritePhotosFail),
        tap(() => {
          this.openSnackBar('Error loading favourites', 'Close');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private favouritesBackend: FavouriteBackend,
    private photosBackend: PhotoBackend,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 10000 });
  }
}
