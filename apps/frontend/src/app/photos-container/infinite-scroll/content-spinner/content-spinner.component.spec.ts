import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSpinnerComponent } from './content-spinner.component';

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
});
