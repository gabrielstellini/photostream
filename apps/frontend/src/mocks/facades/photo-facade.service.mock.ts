import { cold } from 'jasmine-marbles';

export class MockPhotoFacade {
  public photos$ = cold('a', []);
  public photo$ = cold('a', {});

  public fetchNextPage = jest.fn();
  public fetchPhoto = jest.fn();
}
