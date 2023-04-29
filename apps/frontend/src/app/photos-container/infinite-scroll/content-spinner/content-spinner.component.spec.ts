import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSpinnerComponent } from './content-spinner.component';
import { MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('ContentSpinnerComponent', () => {
  let component: ContentSpinnerComponent;
  let fixture: ComponentFixture<ContentSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show content spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const contentSpinner = fixture.debugElement.query(By.directive(MatSpinner));
    expect(contentSpinner).toBeTruthy();
  });

  it('should hide content spinner when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();

    const contentSpinner = fixture.debugElement.query(By.directive(MatSpinner));
    expect(contentSpinner).toBeFalsy();
  });
});
