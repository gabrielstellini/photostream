const baseUrl = 'http://localhost:3000/';

export const BackendUrls = Object.freeze({
  photos: () => `${baseUrl}photos`,
  photo: (id: string) => `${baseUrl}photos/${id}`,
  favourites: () => `${baseUrl}favourites`,
  favourite: (id: string) => `${baseUrl}favourites/${id}`,
});
