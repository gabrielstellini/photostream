import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  fetchFavourites,
  fetchFavouritesFail,
  fetchFavouritesSuccess,
} from '../actions/fetch-favourites.actions';
import { FavouriteBackend } from '../services/favourite-backend.service';

@Injectable()
export class FetchFavouriteEffect {
  public fetchFavourites$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchFavourites),
        mergeMap(() => {
          return this.favouritesBackend.fetchFavourites().pipe(
            map((favourites) =>
              fetchFavouritesSuccess({
                payload: favourites,
              })
            )
          );
        }),
        catchError(() => of(fetchFavouritesFail()))
      )
  );

  public fetchFavouritesFail$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchFavouritesFail),
        tap(() => {
          this.openSnackBar('Error loading favourites', 'Close');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private favouritesBackend: FavouriteBackend,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 10000 });
  }
}
