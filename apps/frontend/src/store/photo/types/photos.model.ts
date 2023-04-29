// DTO - represents an entity
export interface PhotoDto {
  id: string;
  author: string;
  url: string;
  thumbnail_url: string;
  download_url: string;
}

// XRequestParams - represents the request to the API
export interface PhotosRequestParams {
  _page: number;
  _limit: number;
}

// XResponse - represents a response from the API
export type PhotoResponse = PhotoDto;
export type PhotosResponse = PhotoDto[];

// Types in store
export interface PhotosStore {
  items: PhotoDto[];
  lastLoadedPage: number;
  maxPage: number;
}

export type PhotoStore = PhotoDto;
