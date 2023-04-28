import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {
  PhotoResponse,
  PhotosRequestParams,
  PhotosResponse,
} from '../types/photos.model';
import { BackendUrls } from '../../../statics/backendUrls.static';

@Injectable({
  providedIn: 'root',
})
export class PhotoBackend {
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
      .pipe(delay(this.randomRange(200, 300)));
  }

  public getPhoto(id: string): Observable<PhotoResponse> {
    return this.http.get<PhotoResponse>(BackendUrls.photo(id));
  }

  private randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
