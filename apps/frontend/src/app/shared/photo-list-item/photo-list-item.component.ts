import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDto } from '../../../store/photo/types/photos.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ps-photo-list-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './photo-list-item.component.html',
  styleUrls: ['./photo-list-item.component.scss'],
})
export class PhotoListItemComponent {
  @Input() public item?: PhotoDto;
}
