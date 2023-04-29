import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoDto } from '../../store/photo/types/photos.model';

@Component({
  selector: 'ps-photo-list',
  template: '<h1>Fake photo list</h1>',
  standalone: true,
})
export class MockPhotoListComponent {
  @Input() public items: PhotoDto[] = [];
  @Input() public animate: boolean = false;
  @Output() public loadNextPage = new EventEmitter<void>();
}
