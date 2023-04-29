import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        RouterLinkActive,
        ToolbarComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to the home page', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('routerLink')).toBe('/');
    expect(link.textContent.trim()).toBe('PhotoStream');
  });

  it('should have a link to the photos page', () => {
    const link = fixture.nativeElement.querySelector('[data-cy="photo-link"]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('routerLink')).toBe('/photos');
    expect(link.textContent.trim()).toBe('Photos');
  });

  it('should have a link to the favourites page', () => {
    const link = fixture.nativeElement.querySelector(
      '[data-cy="favourites-link"]'
    );
    expect(link).toBeTruthy();
    expect(link.getAttribute('routerLink')).toBe('/favourites');
    expect(link.textContent.trim()).toBe('Favourites');
  });
});
