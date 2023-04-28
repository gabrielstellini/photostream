import { NEVER, Observable } from 'rxjs';
import { UserResponseType } from '../../store/user/types/user-response.type';

export class MockUserBackend {
  public getUser(): Observable<UserResponseType> {
    return NEVER;
  }
}
