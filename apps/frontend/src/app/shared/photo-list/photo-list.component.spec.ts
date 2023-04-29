import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { MockPhotoListItemComponent } from '../../../mocks/components/photo-list-item.mock.component';
import { PhotoListItemComponent } from '../photo-list-item/photo-list-item.component';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListComponent],
    })
      .overrideComponent(PhotoListComponent, {
        remove: {
          imports: [PhotoListItemComponent],
        },
        add: {
          imports: [MockPhotoListItemComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
