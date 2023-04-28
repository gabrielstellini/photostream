import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserBackendService } from '../services/user-backend.service';
import {
  getUser,
  getUserFail,
  getUserSuccess,
} from '../actions/get-user-actions';
import { of } from 'rxjs';

@Injectable()
export class GetUserEffects {
  public getUserEffect$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(getUser),
        mergeMap(({ payload }) => {
          return this.userBackend.getUser().pipe(
            map((user) =>
              getUserSuccess({
                payload: user,
              })
            )
          );
        }),
        catchError(() => of(getUserFail()))
      )
  );

  constructor(
    private actions$: Actions,
    private userBackend: UserBackendService
  ) {}
}
