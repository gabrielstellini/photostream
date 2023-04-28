import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserBackendService } from '../services/user-backend.service';
import { getUser, getUserSuccess } from '../actions/get-user-actions';

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
        })
      )
  );

  constructor(
    private actions$: Actions,
    private userBackend: UserBackendService
  ) {}
}
