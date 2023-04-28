import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserFacade } from '../../store/user/services/user-facade.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'nestangular-template-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, JsonPipe],
})
export class DashboardComponent {
  public user = this.userFacade.user$;

  constructor(private userFacade: UserFacade) {}

  public fetchUser() {
    this.userFacade.fetchUser();
  }
}
