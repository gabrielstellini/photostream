import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from '../shared/photo-list/photo-list.component';

@Component({
  selector: 'ps-photos-container',
  standalone: true,
  imports: [CommonModule, PhotoListComponent],
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.scss'],
})
export class PhotosContainerComponent {}
