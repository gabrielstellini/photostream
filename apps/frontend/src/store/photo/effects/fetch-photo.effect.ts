import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PhotoBackend } from '../services/photo-backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  fetchPhoto,
  fetchPhotoFail,
  fetchPhotoSuccess,
} from '../actions/fetch-photo.actions';

@Injectable()
export class FetchPhotoEffect {
  public fetchPhoto$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchPhoto),
        mergeMap(({ payload }) => {
          return this.photoBackend.getPhoto(payload.id).pipe(
            map((photos) =>
              fetchPhotoSuccess({
                payload: photos,
              })
            )
          );
        }),
        catchError(() => of(fetchPhotoFail()))
      )
  );

  public fetchPhotoFail$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchPhotoFail),
        tap(() => {
          this.openSnackBar('Error loading photos', 'Close');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private photoBackend: PhotoBackend,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 10000 });
  }
}
