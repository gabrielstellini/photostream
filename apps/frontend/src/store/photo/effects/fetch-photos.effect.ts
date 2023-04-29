import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  fetchNextPage,
  fetchPhotos,
  fetchPhotosFail,
  fetchPhotosSuccess,
} from '../actions/fetch-photos.actions';
import { PhotoBackend } from '../services/photo-backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotosResponse } from '../types/photos.model';
import { Store } from '@ngrx/store';
import {
  selectPhotosLoading,
  selectPhotosPagination,
} from '../selectors/photos.selector';

@Injectable()
export class FetchPhotosEffect {
  public fetchNextPage$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchNextPage),
        concatLatestFrom(() => [
          this.store.select(selectPhotosPagination),
          this.store.select(selectPhotosLoading),
        ]),
        map((data) => {
          const [_, { maxPage, lastLoadedPage }] = data;
          return fetchPhotos({
            payload: {
              _page: lastLoadedPage !== undefined ? lastLoadedPage + 1 : 1,
              _limit: 20,
            },
          });
        })
      )
  );

  public fetch$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchPhotos),
        mergeMap(({ payload }) => {
          return this.photoBackend.getPhotos(payload).pipe(
            map((response) =>
              fetchPhotosSuccess({
                payload: {
                  items: response.body as PhotosResponse,
                  newPageIndex: payload._page,
                  maxPage: Math.ceil(
                    +(response.headers.get('x-total-count') ?? 0) /
                      payload._limit
                  ),
                },
              })
            ),
            catchError(() => of(fetchPhotosFail()))
          );
        })
      )
  );

  public showToast$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(fetchPhotosFail),
        tap(() => {
          this.openSnackBar('Error loading photos', 'Close');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private photoBackend: PhotoBackend,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
