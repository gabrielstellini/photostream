import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchFavouritePhotosEffect } from './fetch-favourite-photos.effect';
import {
  fetchFavouritePhotos,
  fetchFavouritePhotosFail,
  fetchFavouritesPhotosSuccess,
} from '../actions/fetch-favourite-photos.actions';
import { FavouriteBackend } from '../services/favourite-backend.service';
import { PhotoBackend } from '../../photo/services/photo-backend.service';
import { PhotoDto } from '../../photo/types/photos.model';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';

describe('FetchFavouritePhotosEffect', () => {
  let actions$: TestHotObservable;
  let effects: FetchFavouritePhotosEffect;
  let favouritesBackend: FavouriteBackend;
  let photosBackend: PhotoBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FetchFavouritePhotosEffect,
        provideMockActions(() => actions$),
        {
          provide: FavouriteBackend,
          useValue: {
            fetchFavourites: jest.fn(),
          },
        },
        {
          provide: PhotoBackend,
          useValue: {
            getPhotosById: jest.fn(),
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(FetchFavouritePhotosEffect);
    favouritesBackend = TestBed.inject(FavouriteBackend);
    photosBackend = TestBed.inject(PhotoBackend);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch fetchFavouritesPhotosSuccess on successful fetchFavouritePhotos', () => {
    const favourites = ['123', '345'];
    const favouritePhotos: PhotoDto[] = [
      {
        id: favourites[0],
        author: 'test',
        url: 'test',
        thumbnail_url: 'test',
        download_url: 'test',
      },
      {
        id: favourites[1],
        author: 'test2',
        url: 'test2',
        thumbnail_url: 'test2',
        download_url: 'test2',
      },
    ];

    const action = fetchFavouritePhotos();
    const completion = fetchFavouritesPhotosSuccess({
      payload: favouritePhotos,
    });

    actions$ = hot('-a', { a: action });
    const response1 = cold('-b', { b: favourites });
    const response2 = cold('-c', { c: favouritePhotos });
    const expected = cold('---d', { d: completion });

    favouritesBackend.fetchFavourites = jest.fn(() => response1);
    photosBackend.getPhotosById = jest.fn(() => response2);

    expect(effects.fetchFavouritePhotos$).toBeObservable(expected);
  });

  it('should dispatch fetchFavouritePhotosFail on failed fetchFavouritePhotos', () => {
    const action = fetchFavouritePhotos();
    const completion = fetchFavouritePhotosFail();

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, 'Error');
    const expected = cold('--c', { c: completion });

    favouritesBackend.fetchFavourites = jest.fn(() => response);

    expect(effects.fetchFavouritePhotos$).toBeObservable(expected);
  });

  it('should open snackbar on failure', () => {
    const snackbarSpy = jest.spyOn(effects, 'openSnackBar');
    const fetchFavouritePhotosFailAction = fetchFavouritePhotosFail();

    actions$ = hot('-a', { a: fetchFavouritePhotosFailAction });
    const expected = cold('-a', {
      a: fetchFavouritePhotosFailAction,
    });

    expect(effects.showToast$).toBeObservable(expected);
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
