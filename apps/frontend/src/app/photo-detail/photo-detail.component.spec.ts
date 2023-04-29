import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailComponent } from './photo-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FavouriteFacade } from '../../store/favourite/services/favourite-facade.service';
import { of } from 'rxjs';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { ActivatedRoute } from '@angular/router';

describe('PhotoDetailComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  let favouriteFacadeMock: jest.Mocked<FavouriteFacade>;
  let photosFacadeMock: jest.Mocked<PhotoFacade>;

  const mockPhotoId = 123;

  beforeEach(async () => {
    favouriteFacadeMock = {
      favouritePhotos$: of({}),
      favouritesLoading$: of(false),
      updateLoading$: of(false),
      fetchFavourites: jest.fn(),
      fetchFavouritePhotos: jest.fn(),
      addFavourite: jest.fn(),
      removeFavourite: jest.fn(),
    } as unknown as jest.Mocked<FavouriteFacade>;

    photosFacadeMock = {
      photo$: of({
        data: {
          id: mockPhotoId,
        },
      }),
      fetchPhoto: jest.fn(),
    } as unknown as jest.Mocked<PhotoFacade>;

    await TestBed.configureTestingModule({
      imports: [PhotoDetailComponent, RouterTestingModule],
    })
      .overrideComponent(PhotoDetailComponent, {
        remove: {
          providers: [FavouriteFacade, PhotoFacade, ActivatedRoute],
          imports: [],
        },
        add: {
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                params: of({ id: mockPhotoId }),
              },
            },
            {
              provide: FavouriteFacade,
              useValue: favouriteFacadeMock,
            },
            {
              provide: PhotoFacade,
              useValue: photosFacadeMock,
            },
          ],
          imports: [],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on ngOnInit', () => {
    component.ngOnInit();
    expect(favouriteFacadeMock.fetchFavourites).toHaveBeenCalled();
    expect(photosFacadeMock.fetchPhoto).toHaveBeenCalledWith(mockPhotoId);
  });

  it('should call addToFavourites when toggling favourite from false to true', () => {
    component.isFavourite = false;
    component.toggleFavourite();
    expect(favouriteFacadeMock.addFavourite).toHaveBeenCalled();
  });

  it('should call addToFavourites when toggling favourite from true to false', () => {
    component.isFavourite = true;
    component.toggleFavourite();
    expect(favouriteFacadeMock.removeFavourite).toHaveBeenCalled();
  });
});
