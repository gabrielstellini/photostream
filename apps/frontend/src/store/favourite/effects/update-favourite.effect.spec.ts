import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateFavouriteEffect } from './update-favourite.effect';
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
import { FavouriteBackend } from '../services/favourite-backend.service';
import { PhotoDto } from '../../photo/types/photos.model';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';

describe('UpdateFavouriteEffect', () => {
  let actions$: TestHotObservable;
  let effects: UpdateFavouriteEffect;
  let favouritesBackend: FavouriteBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateFavouriteEffect,
        provideMockActions(() => actions$),
        {
          provide: FavouriteBackend,
          useValue: {
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
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

    effects = TestBed.inject(UpdateFavouriteEffect);
    favouritesBackend = TestBed.inject(FavouriteBackend);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch addFavouriteSuccess on successful addFavourite', () => {
    const mockPhotoResponse: PhotoDto = {
      id: '1',
      author: 'test',
      url: 'test',
      thumbnail_url: 'test',
      download_url: 'test',
    };
    const action = addFavourite({ payload: mockPhotoResponse.id });
    const completion = addFavouriteSuccess({ payload: mockPhotoResponse });

    actions$ = hot('-a', { a: action });
    const response = cold('-b', { b: mockPhotoResponse });
    const expected = cold('--c', { c: completion });

    favouritesBackend.addFavourite = jest.fn(() => response);

    expect(effects.addFavourite$).toBeObservable(expected);
  });

  it('should dispatch addFavouriteFail on failed addFavourite', () => {
    const payload = 'test';
    const action = addFavourite({ payload });
    const completion = addFavouriteFail();

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, 'Error');
    const expected = cold('--c', { c: completion });

    favouritesBackend.addFavourite = jest.fn(() => response);

    expect(effects.addFavourite$).toBeObservable(expected);
  });

  it('should dispatch removeFavouriteSuccess on successful removeFavourite', () => {
    const payload = 'test';
    const action = removeFavourite({ payload });
    const completion = removeFavouriteSuccess({ payload });

    actions$ = hot('-a', { a: action });
    const response = cold('-b', { b: payload });
    const expected = cold('--c', { c: completion });

    favouritesBackend.removeFavourite = jest.fn(() => response);

    expect(effects.removeFavourite$).toBeObservable(expected);
  });

  it('should dispatch removeFavouriteFail on failed removeFavourite', () => {
    const payload = 'test';
    const action = removeFavourite({ payload });
    const completion = removeFavouriteFail();

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, 'Error');
    const expected = cold('--c', { c: completion });

    favouritesBackend.removeFavourite = jest.fn(() => response);

    expect(effects.removeFavourite$).toBeObservable(expected);
  });

  it('should open snackbar on error', () => {
    const snackbarSpy = jest.spyOn(effects, 'openSnackBar');
    const addFavouriteFailAction = addFavouriteFail();
    const removeFavouriteFailAction = removeFavouriteFail();

    actions$ = hot('-ab', {
      a: addFavouriteFailAction,
      b: removeFavouriteFailAction,
    });

    const expected = cold('-ab', {
      a: addFavouriteFailAction,
      b: removeFavouriteFailAction,
    });

    expect(effects.showToast$).toBeObservable(expected);
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
