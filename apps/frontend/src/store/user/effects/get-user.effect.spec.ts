import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GetUserEffects } from './get-user.effect';
import { UserState } from '../reducers';
import { MockUserBackend } from '../../../mocks/backends/user-backend.mock';
import { UserBackend } from '../services/user-backend.service';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: GetUserEffects;

  let mockStore: MockStore<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetUserEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: UserBackend,
          useValue: MockUserBackend,
        },
      ],
    });

    effects = TestBed.inject(GetUserEffects);
    mockStore = TestBed.inject(MockStore) as MockStore<UserState>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
