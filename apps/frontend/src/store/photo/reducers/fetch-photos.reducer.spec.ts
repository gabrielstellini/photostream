import {
  fetchPhotos,
  fetchPhotosFail,
  fetchPhotosSuccess,
} from '../actions/fetch-photos.actions';
import { fetchPhotosReducer, FetchPhotosState } from './fetch-photos.reducer';

describe('fetchPhotosReducer', () => {
  let initialState: FetchPhotosState;

  beforeEach(() => {
    initialState = {
      data: null,
      loading: false,
      loaded: false,
      error: false,
    };
  });

  it('should set loading to true when fetching photos', () => {
    const action = fetchPhotos({
      payload: {
        _page: 1,
        _limit: 10,
      },
    });
    const expectedState: FetchPhotosState = {
      ...initialState,
      loading: true,
    };

    const newState = fetchPhotosReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update the state with fetched photos when fetchPhotosSuccess is called', () => {
    const payload = {
      items: [
        {
          id: '1',
          author: 'John Doe',
          url: 'https://example.com/image.jpg',
          download_url: 'https://example.com/image-download.jpg',
          height: 100,
          width: 100,
        },
      ],
      newPageIndex: 1,
      maxPage: 5,
    };
    const action = fetchPhotosSuccess({ payload });
    const expectedState: FetchPhotosState = {
      ...initialState,
      data: {
        items: payload.items,
        lastLoadedPage: payload.newPageIndex,
        maxPage: payload.maxPage,
      },
      loading: false,
      loaded: true,
    };

    const newState = fetchPhotosReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update the state with error when fetchPhotosFail is called', () => {
    const action = fetchPhotosFail();
    const expectedState: FetchPhotosState = {
      ...initialState,
      loading: false,
      loaded: false,
      error: true,
    };

    const newState = fetchPhotosReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should add new photos to the state when fetchPhotosSuccess is called more than once', () => {
    const firstPayload = {
      items: [
        {
          id: '1',
          author: 'John Doe',
          url: 'https://example.com/image.jpg',
          download_url: 'https://example.com/image-download.jpg',
          height: 100,
          width: 100,
        },
      ],
      newPageIndex: 1,
      maxPage: 5,
    };
    const secondPayload = {
      items: [
        {
          id: '2',
          author: 'Jane Doe',
          url: 'https://example.com/image2.jpg',
          download_url: 'https://example.com/image-download2.jpg',
          height: 200,
          width: 200,
        },
      ],
      newPageIndex: 2,
      maxPage: 5,
    };
    const firstAction = fetchPhotosSuccess({ payload: firstPayload });
    const secondAction = fetchPhotosSuccess({ payload: secondPayload });
    const expectedState: FetchPhotosState = {
      ...initialState,
      data: {
        items: [...firstPayload.items, ...secondPayload.items],
        lastLoadedPage: secondPayload.newPageIndex,
        maxPage: secondPayload.maxPage,
      },
      loading: false,
      loaded: true,
    };

    let newState = fetchPhotosReducer(initialState, firstAction);
    newState = fetchPhotosReducer(newState, secondAction);
    expect(newState).toEqual(expectedState);
  });
});
