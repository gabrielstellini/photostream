import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchFavouritesEffect } from './fetch-favourites.effect';
import {
  fetchFavourites,
  fetchFavouritesFail,
  fetchFavouritesSuccess,
} from '../actions/fetch-favourites.actions';
import { FavouriteBackend } from '../services/favourite-backend.service';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';

describe('FetchFavouritesEffect', () => {
  let actions$: TestHotObservable;
  let effects: FetchFavouritesEffect;
  let favouritesBackend: FavouriteBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FetchFavouritesEffect,
        provideMockActions(() => actions$),
        {
          provide: FavouriteBackend,
          useValue: {
            fetchFavourites: jest.fn(),
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

    effects = TestBed.inject(FetchFavouritesEffect);
    favouritesBackend = TestBed.inject(FavouriteBackend);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch fetchFavouritesSuccess on successful fetchFavourites', () => {
    const payload = ['123', '456'];
    const action = fetchFavourites();
    const completion = fetchFavouritesSuccess({ payload });

    actions$ = hot('-a', { a: action });
    const response = cold('-b', { b: payload });
    const expected = cold('--c', { c: completion });

    favouritesBackend.fetchFavourites = jest.fn(() => response);

    expect(effects.fetchFavourites$).toBeObservable(expected);
  });

  it('should dispatch fetchFavouritesFail on failed fetchFavourites', () => {
    const action = fetchFavourites();
    const completion = fetchFavouritesFail();

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, 'Error');
    const expected = cold('--c', { c: completion });

    favouritesBackend.fetchFavourites = jest.fn(() => response);

    expect(effects.fetchFavourites$).toBeObservable(expected);
  });

  it('should open snackbar on failure', () => {
    const snackbarSpy = jest.spyOn(effects, 'openSnackBar');
    const fetchFavouritesFailAction = fetchFavouritesFail();

    actions$ = hot('-a', { a: fetchFavouritesFailAction });
    const expected = cold('-a', {
      a: fetchFavouritesFailAction,
    });

    expect(effects.showToast$).toBeObservable(expected);
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
