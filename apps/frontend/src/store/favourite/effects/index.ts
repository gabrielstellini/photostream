import { FetchFavouritePhotosEffect } from './fetch-favourite-photos.effect';
import { UpdateFavouriteEffect } from './update-favourite.effect';
import { FetchFavouritesEffect } from './fetch-favourites.effect';

export const favouriteEffects = [
  FetchFavouritePhotosEffect,
  FetchFavouritesEffect,
  UpdateFavouriteEffect,
];
