import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {
  PhotoResponse,
  PhotosRequestParams,
  PhotosResponse,
} from '../types/photos.model';
import { BackendUrls } from '../../../statics/backendUrls.static';
import { RandomRangePipe } from '../../shared/pipes/random-range.pipe';

@Injectable({
  providedIn: 'root',
})
export class PhotoBackend {
  private randomRange = new RandomRangePipe();

  constructor(private http: HttpClient) {}

  public getPhotos(
    photoRequestParams?: PhotosRequestParams
  ): Observable<HttpResponse<PhotosResponse>> {
    let params = new HttpParams();

    if (photoRequestParams) {
      params = params.append('_page', photoRequestParams._page);
      params = params.append('_limit', photoRequestParams._limit);
    }

    return this.http
      .get<PhotosResponse>(BackendUrls.photos(), {
        params,
        observe: 'response',
      })
      .pipe(delay(this.randomRange.transform(200, 300)));
  }

  public getPhotosById(
    photoRequestParams: string[]
  ): Observable<PhotosResponse> {
    if (!photoRequestParams.length) {
      return of([]).pipe(delay(this.randomRange.transform(200, 300)));
    }

    let params = new HttpParams();

    photoRequestParams.forEach((id) => {
      params = params.append('id', id);
    });

    return this.http
      .get<PhotosResponse>(BackendUrls.photos(), {
        params,
      })
      .pipe(delay(this.randomRange.transform(200, 300)));
  }

  public getPhoto(id: string): Observable<PhotoResponse> {
    return this.http.get<PhotoResponse>(BackendUrls.photo(id));
  }
}
