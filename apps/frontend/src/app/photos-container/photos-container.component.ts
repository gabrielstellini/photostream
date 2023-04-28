import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from '../shared/photo-list/photo-list.component';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { PhotoDto } from '../../store/photo/types/photos.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { auditTime, filter, fromEvent } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@UntilDestroy()
@Component({
  selector: 'ps-photos-container',
  standalone: true,
  imports: [CommonModule, PhotoListComponent, CdkVirtualScrollViewport],
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.scss'],
})
export class PhotosContainerComponent implements OnInit, AfterViewInit {
  public items: PhotoDto[] = [];

  constructor(private photoFacade: PhotoFacade) {}

  public ngOnInit(): void {
    this.photoFacade.fetchNextPage();

    this.photoFacade.photos$.pipe(untilDestroyed(this)).subscribe((photos) => {
      this.items = photos?.data?.items ?? [];
    });
  }

  ngAfterViewInit(): void {
    this.listenToScroll();
  }

  private listenToScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        filter(() => {
          const pos =
            (document.documentElement.scrollTop || document.body.scrollTop) +
            document.documentElement.offsetHeight;
          const max = document.documentElement.scrollHeight;

          // start lazy loading from 500 px before the end
          return pos > max - 800;
        }),
        auditTime(200),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.photoFacade.fetchNextPage();
      });
  }
}
