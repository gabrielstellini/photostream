import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPhotos } from '../selectors/photos.selector';
import { selectPhoto } from '../selectors/photo.selector';
import { fetchNextPage } from '../actions/fetch-photos.actions';
import { fetchPhoto } from '../actions/fetch-photo.actions';

@Injectable({
  providedIn: 'root',
})
export class PhotoFacade {
  public photos$ = this.store.select(selectPhotos);
  public photo$ = this.store.select(selectPhoto);

  constructor(private store: Store) {}

  public fetchNextPage() {
    this.store.dispatch(fetchNextPage());
  }

  public fetchPhoto(id: string) {
    this.store.dispatch(fetchPhoto({ payload: { id } }));
  }
}
