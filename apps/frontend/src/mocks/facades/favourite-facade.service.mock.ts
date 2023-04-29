import { NEVER } from 'rxjs';
import {
  AddFavouriteRequest,
  RemoveFavouriteRequest,
} from '../../store/favourite/types/favourite.model';

export class MockFavouriteFacade {
  public favourites$ = NEVER;
  public favouritePhotos$ = NEVER;
  public updateLoading$ = NEVER;
  public favouritesLoading$ = NEVER;

  public isFavourite$ = (id: string) => NEVER;

  public fetchFavouritePhotos(): void {}

  public fetchFavourites(): void {}

  public addFavourite(_id: AddFavouriteRequest): void {}

  public removeFavourite(_id: RemoveFavouriteRequest): void {}
}
