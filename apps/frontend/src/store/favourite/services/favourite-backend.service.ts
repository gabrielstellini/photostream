import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FavouritesResponse } from '../types/favourite.model';
import { RandomRangePipe } from '../../shared/pipes/random-range.pipe';

@Injectable({
  providedIn: 'root',
})
export class FavouriteBackend {
  private randomRange = new RandomRangePipe();

  /**
   * This task states that I cannot use a backend server to retain state,
   * So this backend service uses local storage to retain state.
   * The commented code below is an approximation of what I would use if I had a backend server.
   */
  public fetchFavourites(): Observable<FavouritesResponse> {
    return of(this.getFavourites()).pipe(
      delay(this.randomRange.transform(200, 300))
    );

    // return this.http
    //   .get<FavouriteResponse>(BackendUrls.favourites())
    //   .pipe(delay(this.randomRange.transform(200, 300)));
  }

  public addFavourite(id: string): Observable<string> {
    localStorage.setItem(
      'favourites',
      JSON.stringify([...this.getFavourites(), id])
    );

    return of(id).pipe(delay(this.randomRange.transform(200, 300)));

    // return this.http
    //   .post<FavouriteResponse>(BackendUrls.favourites(), { id })
    //   .pipe(delay(this.randomRange.transform(200, 300)));
  }

  public removeFavourite(id: string): Observable<string> {
    const favourites = this.getFavourites().filter(
      (currentId) => currentId !== id
    );

    localStorage.setItem('favourites', JSON.stringify([...favourites, id]));

    return of(id).pipe(delay(this.randomRange.transform(200, 300)));

    // return this.http
    //   .delete<FavouriteResponse>(BackendUrls.favourite(id))
    //   .pipe(delay(this.randomRange.transform(200, 300)));
  }

  private getFavourites(): FavouritesResponse {
    return (JSON.parse(localStorage.getItem('favourites') ?? '[]') ??
      []) as FavouritesResponse;
  }
}
