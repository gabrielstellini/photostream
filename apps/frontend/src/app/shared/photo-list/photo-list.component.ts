import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListItemComponent } from '../photo-list-item/photo-list-item.component';
import { PhotoDto } from '../../../store/photo/types/photos.model';

@Component({
  selector: 'ps-photo-list',
  standalone: true,
  imports: [CommonModule, PhotoListItemComponent],
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent {
  @Input() public items: PhotoDto[] = [];
  @Output() public loadNextPage = new EventEmitter<void>();

  public trackById = (index: number): number => index;
}
