import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListItemComponent } from './photo-list-item.component';
import { PhotoDto } from '../../../store/photo/types/photos.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PhotoListItemComponent', () => {
  let component: PhotoListItemComponent;
  let fixture: ComponentFixture<PhotoListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListItemComponent, RouterTestingModule],
    })
      .overrideComponent(PhotoListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the photo details if item is provided', () => {
    const item: PhotoDto = {
      id: '1',
      author: 'John Doe',
      url: 'https://example.com/image.jpg',
      download_url: 'https://example.com/image-download.jpg',
      height: 100,
      width: 100,
    };
    component.item = item;

    fixture.detectChanges();
    fixture.detectChanges();
    fixture.detectChanges();
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('mat-card');
    expect(cardElement).toBeTruthy();

    const titleElement = fixture.nativeElement.querySelector(
      '[data-cy="author"]'
    );
    expect(titleElement.textContent.trim()).toBe(item.author);

    const subtitleElement =
      fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(
      subtitleElement
        .querySelector('[data-cy="source-link"]')
        .getAttribute('href')
    ).toBe(item.url);

    const imageElement = fixture.nativeElement.querySelector('img');
    expect(imageElement.getAttribute('src')).toBe(item.download_url);

    const imageLink = fixture.nativeElement.querySelector('.image-link');
    expect(imageLink.getAttribute('href')).toBe('/photos/1');

    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinnerElement).toBeFalsy();
  });

  it('should render a spinner if item is not provided', () => {
    fixture.detectChanges();
    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinnerElement).toBeTruthy();
  });
});
