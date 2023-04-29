import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoBackend } from '../services/photo-backend.service';
import { FetchPhotosEffect } from './fetch-photos.effect';
import {
  fetchNextPage,
  fetchPhotos,
  fetchPhotosFail,
  fetchPhotosSuccess,
} from '../actions/fetch-photos.actions';
import { cold, hot } from 'jasmine-marbles';
import { PhotosResponse } from '../types/photos.model';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';

describe('FetchPhotosEffect', () => {
  let actions$: Observable<Action>;
  let effects: FetchPhotosEffect;
  let photoBackend: jest.Mocked<PhotoBackend>;
  let snackBar: jest.Mocked<MatSnackBar>;
  const initialState = {
    photo: {
      fetchPhotos: {
        data: {
          maxPage: 5,
          lastLoadedPage: 1,
        },
        loaded: true,
        loading: false,
      },
    },
  };

  beforeEach(() => {
    photoBackend = {
      getPhotos: jest.fn(),
    } as unknown as jest.Mocked<PhotoBackend>;

    snackBar = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatSnackBar>;

    TestBed.configureTestingModule({
      providers: [
        FetchPhotosEffect,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState,
        }),
        { provide: PhotoBackend, useValue: photoBackend },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });

    effects = TestBed.inject(FetchPhotosEffect);
  });

  it('should fetch the next page', () => {
    actions$ = hot('-a', { a: fetchNextPage() });
    const expected = cold('-a', {
      a: fetchPhotos({
        payload: {
          _page: initialState.photo.fetchPhotos.data.lastLoadedPage + 1,
          _limit: 20,
        },
      }),
    });

    expect(effects.fetchNextPage$).toBeObservable(expected);
  });

  it('should fetch photos successfully', () => {
    const mockPhotos: PhotosResponse = [
      {
        id: '1',
        author: 'test',
        url: 'test',
        width: 1,
        height: 1,
        download_url: 'test',
      },
    ];

    const httpResponse = new HttpResponse<PhotosResponse>({
      body: mockPhotos,
      headers: new HttpHeaders({ 'x-total-count': '100' }),
    });

    photoBackend.getPhotos.mockReturnValueOnce(cold('-a', { a: httpResponse }));

    actions$ = hot('-a', {
      a: fetchPhotos({ payload: { _page: 1, _limit: 20 } }),
    });

    const expected = cold('--a', {
      a: fetchPhotosSuccess({
        payload: {
          items: mockPhotos,
          newPageIndex: 1,
          maxPage: 5,
        },
      }),
    });

    expect(effects.fetch$).toBeObservable(expected);
  });

  it('should handle fetch photos failure', () => {
    photoBackend.getPhotos.mockReturnValueOnce(cold('-#', {}, 'Error'));

    actions$ = hot('-a', {
      a: fetchPhotos({ payload: { _page: 1, _limit: 20 } }),
    });

    const expected = cold('--a', { a: fetchPhotosFail() });

    expect(effects.fetch$).toBeObservable(expected);
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('should show snackbar on fetch photos failure', () => {
    actions$ = hot('-a', { a: fetchPhotosFail() });

    const expected = cold('-a', { a: fetchPhotosFail() });

    expect(effects.showToast$).toBeObservable(expected);
    expect(snackBar.open).toHaveBeenCalledWith('Error loading photos', 'Close');
  });
});
