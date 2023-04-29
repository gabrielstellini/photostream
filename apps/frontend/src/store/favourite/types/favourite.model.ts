// DTO - represents an entity
export type FavouriteDto = string;

export type AddFavouriteRequest = FavouriteDto;
export type RemoveFavouriteRequest = FavouriteDto;

// XResponse - represents a response from the API
export type FavouritesResponse = FavouriteDto[];

// Types in store
export interface FavouritesStore {
  ids: FavouriteDto[];
}
