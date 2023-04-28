import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesContainerComponent } from './favourites-container.component';

describe('FavouritesContainerComponent', () => {
  let component: FavouritesContainerComponent;
  let fixture: ComponentFixture<FavouritesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FavouritesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
