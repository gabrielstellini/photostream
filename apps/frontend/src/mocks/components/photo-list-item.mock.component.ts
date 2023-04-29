import { Component, Input } from '@angular/core';
import { PhotoDto } from '../../store/photo/types/photos.model';

@Component({
  selector: 'ps-infinite-scroll',
  template: '<h1>Fake photo list item</h1>',
  standalone: true,
})
export class MockPhotoListItemComponent {
  @Input() public item?: PhotoDto;
}
