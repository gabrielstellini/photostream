import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from '../shared/photo-list/photo-list.component';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { PhotoDto } from '../../store/photo/types/photos.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ObserverChildDirective } from './infinite-scroll/observe-child.directive';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { filter, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ps-photos-container',
  standalone: true,
  imports: [
    CommonModule,
    PhotoListComponent,
    CdkVirtualScrollViewport,
    ObserverChildDirective,
    InfiniteScrollComponent,
  ],
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.scss'],
})
export class PhotosContainerComponent implements OnInit {
  public items: PhotoDto[] = [];

  constructor(private photoFacade: PhotoFacade) {}

  public ngOnInit(): void {
    this.photoFacade.photos$.pipe(untilDestroyed(this)).subscribe((photos) => {
      this.items = photos?.data?.items ?? [];
    });
  }

  public loadNextPage(): void {
    this.photoFacade.photos$
      .pipe(
        untilDestroyed(this),
        take(1),
        filter(
          (photos) =>
            !photos?.loading &&
            (!photos?.data ||
              photos?.data?.maxPage > photos?.data?.lastLoadedPage)
        )
      )
      .subscribe(() => {
        this.photoFacade.fetchNextPage();
      });
  }
}
