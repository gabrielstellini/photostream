import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from '../shared/photo-list/photo-list.component';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { PhotoDto } from '../../store/photo/types/photos.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ps-photos-container',
  standalone: true,
  imports: [CommonModule, PhotoListComponent],
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.scss'],
})
export class PhotosContainerComponent implements OnInit {
  public items: PhotoDto[] = [];

  constructor(private photoFacade: PhotoFacade) {}

  public ngOnInit(): void {
    this.photoFacade.fetchNextPage();

    this.photoFacade.photos$.pipe(untilDestroyed(this)).subscribe((photos) => {
      this.items = photos?.data?.items ?? [];
    });
  }
}
