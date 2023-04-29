import { FetchPhotosState } from '../reducers/fetch-photos.reducer';
import {
  selectPhotosData,
  selectPhotosLoading,
  selectPhotosPagination,
} from './photos.selector';

describe('photos selectors', () => {
  const createFetchPhotosState = (
    loading = false,
    loaded = false,
    error = false,
    data: FetchPhotosState['data'] = {
      items: [],
      lastLoadedPage: 1,
      maxPage: 10,
    }
  ): FetchPhotosState => ({
    loading,
    loaded,
    error,
    data,
  });

  it('should select the photos loading state', () => {
    const photosLoadingStateFalse = selectPhotosLoading.projector(
      createFetchPhotosState(false)
    );
    const photosLoadingStateTrue = selectPhotosLoading.projector(
      createFetchPhotosState(true)
    );
    expect(photosLoadingStateFalse).toEqual(false);
    expect(photosLoadingStateTrue).toEqual(true);
  });

  it('should select photo data', () => {
    const mockData = createFetchPhotosState();
    const result = selectPhotosData.projector(mockData);
    expect(result).toEqual(mockData.data);
  });

  it('should select photo pagination', () => {
    const mockData = createFetchPhotosState();
    const result = selectPhotosPagination.projector(mockData.data);
    expect(result).toEqual({
      maxPage: mockData.data?.maxPage,
      lastLoadedPage: mockData.data?.lastLoadedPage,
    });
  });
});
