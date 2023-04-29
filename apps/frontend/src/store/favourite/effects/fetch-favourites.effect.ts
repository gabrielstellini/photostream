import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouriteBackend } from '../services/favourite-backend.service';
import {
  fetchFavourites,
  fetchFavouritesFail,
  fetchFavouritesSuccess,
} from '../actions/fetch-favourites.actions';

@Injectable()
export class FetchFavouritesEffect {
  public fetchFavourites$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchFavourites),
        mergeMap(() =>
          this.favouritesBackend.fetchFavourites().pipe(
            map((favourites) =>
              fetchFavouritesSuccess({
                payload: favourites,
              })
            ),
            catchError(() => of(fetchFavouritesFail()))
          )
        )
      )
  );

  public showToast$ = createEffect(
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
