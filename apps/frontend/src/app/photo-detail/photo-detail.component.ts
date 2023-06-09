import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PhotoDto } from '../../store/photo/types/photos.model';
import { Nullable } from '../../store/shared/types/state.type';
import { FavouriteFacade } from '../../store/favourite/services/favourite-facade.service';
import { switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageSpinnerComponent } from '../shared/page-spinner/page-spinner.component';

@UntilDestroy()
@Component({
  selector: 'ps-photo-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PageSpinnerComponent,
  ],
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
})
export class PhotoDetailComponent implements OnInit {
  public photo: Nullable<PhotoDto> = null;
  public photoLoading = true;
  public isFavourite = false;
  public favouritesLoading = true;
  public updateFavouritesLoading = true;

  constructor(
    private photoFacade: PhotoFacade,
    private favouriteFacade: FavouriteFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.fetchData();
    this.listenToPhotoChanges();
  }

  public toggleFavourite(): void {
    if (this.isFavourite) {
      this.removeFromFavourites();
    } else {
      this.addToFavourites();
    }
  }

  private addToFavourites(): void {
    if (this.photo) {
      this.favouriteFacade.addFavourite(this.photo.id);
    }
  }

  private removeFromFavourites(): void {
    if (this.photo) {
      this.favouriteFacade.removeFavourite(this.photo.id);
    }
  }

  private fetchData(): void {
    this.favouriteFacade.fetchFavourites();

    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.photoFacade.fetchPhoto(params['id']);
      });
  }

  private listenToPhotoChanges(): void {
    this.photoFacade.photo$.pipe(untilDestroyed(this)).subscribe((photo) => {
      this.photo = photo?.data;
      this.photoLoading = photo?.loading ?? false;
    });

    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.favouriteFacade.isFavourite$(params['id']))
      )
      .subscribe((isFavourite) => {
        this.isFavourite = isFavourite ?? false;
      });

    this.favouriteFacade.favouritesLoading$
      .pipe(untilDestroyed(this))
      .subscribe((loading) => {
        this.favouritesLoading = loading;
      });

    this.favouriteFacade.updateLoading$
      .pipe(untilDestroyed(this))
      .subscribe((loading) => {
        this.updateFavouritesLoading = loading;
      });
  }
}
