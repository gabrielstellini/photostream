import { PhotosContainerComponent } from './photos-container.component';
import { of } from 'rxjs';
import { FetchPhotosState } from '../../store/photo/reducers/fetch-photos.reducer';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockInfiniteScrollComponent } from '../../mocks/components/infinite-scroll.mock.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { PhotoListComponent } from '../shared/photo-list/photo-list.component';
import { MockPhotoListComponent } from '../../mocks/components/photo-list.mock.component';

describe('PhotosContainerComponent', () => {
  let photoFacadeMock: jest.Mocked<PhotoFacade>;
  let component: PhotosContainerComponent;
  let fixture: ComponentFixture<PhotosContainerComponent>;

  const fakeState: FetchPhotosState = {
    data: {
      items: [
        {
          id: '1',
          download_url: '',
          thumbnail_url: '',
          url: '',
          author: '',
        },
      ],
      maxPage: 2,
      lastLoadedPage: 1,
    },
    loading: false,
    loaded: true,
    error: false,
  };

  beforeEach(async () => {
    photoFacadeMock = {
      fetchNextPage: jest.fn(),
      photos$: of({}),
    } as unknown as jest.Mocked<PhotoFacade>;

    await TestBed.configureTestingModule({
      imports: [PhotosContainerComponent],
    })
      .overrideComponent(PhotosContainerComponent, {
        remove: {
          providers: [PhotoFacade],
          imports: [PhotoListComponent, InfiniteScrollComponent],
        },
        add: {
          providers: [
            {
              provide: PhotoFacade,
              useValue: photoFacadeMock,
            },
          ],
          imports: [MockPhotoListComponent, MockInfiniteScrollComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PhotosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items and loading on ngOnInit', async () => {
    const photosMock = {
      ...fakeState,
    };
    photoFacadeMock.photos$ = of(photosMock);
    component.loadNextPage();

    expect(photoFacadeMock.fetchNextPage).toHaveBeenCalled();
  });
});
