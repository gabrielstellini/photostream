import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListItemComponent } from '../photo-list-item/photo-list-item.component';
import { PhotoDto } from '../../../store/photo/types/photos.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ps-photo-list',
  standalone: true,
  imports: [CommonModule, PhotoListItemComponent],
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({
          transform: 'translateY(50vh)',
          'will-change': 'transform',
        }),
        animate(
          '{{delay}}ms ease-in-out',
          style({ transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PhotoListComponent {
  @Input() public items: PhotoDto[] = [];
  @Input() public animate = false;

  @Output() public loadNextPage = new EventEmitter<void>();

  public trackById = (index: number): number => index;
}
