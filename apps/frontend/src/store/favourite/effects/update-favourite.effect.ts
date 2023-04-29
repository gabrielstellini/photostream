import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouriteBackend } from '../services/favourite-backend.service';
import {
  addFavourite,
  addFavouriteFail,
  addFavouriteSuccess,
} from '../actions/add-favourite.action';
import {
  removeFavourite,
  removeFavouriteFail,
  removeFavouriteSuccess,
} from '../actions/remove-favourite.action';

@Injectable()
export class UpdateFavouriteEffect {
  public addFavourite$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(addFavourite),
        mergeMap(({ payload }) =>
          this.favouritesBackend.addFavourite(payload).pipe(
            map((favourites) =>
              addFavouriteSuccess({
                payload: favourites,
              })
            ),
            catchError(() => of(addFavouriteFail()))
          )
        )
      )
  );

  public removeFavourite$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(removeFavourite),
        mergeMap(({ payload }) =>
          this.favouritesBackend.removeFavourite(payload).pipe(
            map((favourites) =>
              removeFavouriteSuccess({
                payload: favourites,
              })
            ),
            catchError(() => of(removeFavouriteFail()))
          )
        )
      )
  );

  public showToast$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(addFavouriteFail, removeFavouriteFail),
        tap(() => {
          this.openSnackBar('Error updating the favourite status', 'Close');
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
