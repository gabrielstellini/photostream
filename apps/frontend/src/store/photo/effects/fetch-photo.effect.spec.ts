import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { FetchPhotoEffect } from './fetch-photo.effect';
import { PhotoBackend } from '../services/photo-backend.service';
import {
  fetchPhoto,
  fetchPhotoFail,
  fetchPhotoSuccess,
} from '../actions/fetch-photo.actions';
import { PhotoDto } from '../types/photos.model';
import { cold, hot } from 'jasmine-marbles';

describe('FetchPhotoEffect', () => {
  let actions$: Observable<Action>;
  let effects: FetchPhotoEffect;
  let photoBackend: jest.Mocked<PhotoBackend>;

  beforeEach(() => {
    const photoBackendMock: Partial<PhotoBackend> = {
      getPhoto: jest.fn(),
    };

    const snackBarMock: Partial<MatSnackBar> = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        FetchPhotoEffect,
        provideMockActions(() => actions$),
        { provide: PhotoBackend, useValue: photoBackendMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });

    effects = TestBed.inject(FetchPhotoEffect);
    photoBackend = TestBed.inject(PhotoBackend) as jest.Mocked<PhotoBackend>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch fetchPhotoSuccess on successful photo fetch', (done) => {
    const photo: PhotoDto = {
      id: '1',
      author: 'test',
      url: 'test',
      width: 1,
      height: 1,
      download_url: 'test',
    };

    photoBackend.getPhoto.mockReturnValue(of(photo));

    actions$ = of(fetchPhoto({ payload: { id: '1' } }));

    effects.fetchPhoto$.subscribe((action) => {
      expect(action).toEqual(fetchPhotoSuccess({ payload: photo }));
      done();
    });
  });

  it('should dispatch fetchPhotoFail on failed photo fetch', (done) => {
    photoBackend.getPhoto.mockReturnValue(
      throwError(() => new Error('Failed to fetch photo'))
    );

    actions$ = of(fetchPhoto({ payload: { id: '1' } }));

    effects.fetchPhoto$.subscribe((action) => {
      expect(action).toEqual(fetchPhotoFail());
      done();
    });
  });

  it('should open snackbar on failure', () => {
    const snackbarSpy = jest.spyOn(effects, 'openSnackBar');
    const fetchPhotoFailAction = fetchPhotoFail();

    actions$ = hot('-a', { a: fetchPhotoFailAction });
    const expected = cold('-a', {
      a: fetchPhotoFailAction,
    });

    expect(effects.showToast$).toBeObservable(expected);
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
