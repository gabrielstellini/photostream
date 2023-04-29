import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFavouritesComponent } from './empty-favourites.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmptyFavouritesComponent', () => {
  let component: EmptyFavouritesComponent;
  let fixture: ComponentFixture<EmptyFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyFavouritesComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
