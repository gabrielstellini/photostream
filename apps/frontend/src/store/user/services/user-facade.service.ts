import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { getUser } from '../actions/get-user-actions';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  public user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  public fetchUser() {
    this.store.dispatch(getUser({ payload: { demo: '1' } }));
  }
}
