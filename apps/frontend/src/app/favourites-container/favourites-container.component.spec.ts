import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesContainerComponent } from './favourites-container.component';
import { FavouriteFacade } from '../../store/favourite/services/favourite-facade.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavouritesContainerComponent', () => {
  let component: FavouritesContainerComponent;
  let fixture: ComponentFixture<FavouritesContainerComponent>;
  let favouriteFacadeMock: jest.Mocked<FavouriteFacade>;

  beforeEach(async () => {
    favouriteFacadeMock = {
      favouritePhotos$: of({}),
      fetchFavouritePhotos: jest.fn(),
    } as unknown as jest.Mocked<FavouriteFacade>;

    await TestBed.configureTestingModule({
      imports: [FavouritesContainerComponent, RouterTestingModule],
    })
      .overrideComponent(FavouritesContainerComponent, {
        remove: {
          providers: [FavouriteFacade],
          imports: [],
        },
        add: {
          providers: [
            {
              provide: FavouriteFacade,
              useValue: favouriteFacadeMock,
            },
          ],
          imports: [],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavouritesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchFavouritePhotos on init', () => {
    expect(favouriteFacadeMock.fetchFavouritePhotos).toHaveBeenCalled();
  });

  it('should show spinner when loading', () => {
    fixture.componentInstance.photos = undefined;
    fixture.componentInstance.loading = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('ps-page-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show empty favourites when loaded and no data', () => {
    fixture.componentInstance.photos = [];
    fixture.componentInstance.loading = false;
    fixture.detectChanges();

    const emptyFavourites = fixture.nativeElement.querySelector(
      'ps-empty-favourites'
    );
    expect(emptyFavourites).toBeTruthy();
  });
});
