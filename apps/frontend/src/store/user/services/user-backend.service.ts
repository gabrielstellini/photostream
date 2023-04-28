import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseType } from '../types/user-response.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserBackend {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<UserResponseType> {
    return this.http.get<UserResponseType>('http://localhost:3333/api/user');
  }
}
