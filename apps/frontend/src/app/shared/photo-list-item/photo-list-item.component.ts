import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDto } from '../../../store/photo/types/photos.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ps-photo-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './photo-list-item.component.html',
  styleUrls: ['./photo-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListItemComponent {
  @Input() public item?: PhotoDto;
}
