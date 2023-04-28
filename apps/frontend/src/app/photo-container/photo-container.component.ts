import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFacade } from '../../store/photo/services/photo-facade.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PhotoDto } from '../../store/photo/types/photos.model';
import { Nullable } from '../../store/shared/types/state.type';

@Component({
  selector: 'ps-photo-container',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.scss'],
})
export class PhotoContainerComponent implements OnInit {
  public photo: Nullable<PhotoDto> = null;
  public loading = false;
  public isFavourite = false;

  constructor(
    private photoFacade: PhotoFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.photoFacade.fetchPhoto(params['id']);
    });

    this.photoFacade.photo$.subscribe((photo) => {
      this.photo = photo?.data;
      this.loading = photo?.loading ?? false;
    });
  }
}
