import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserFacade } from '../../store/user/services/user-facade.service';

@Component({
  selector: 'nestangular-template-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class DashboardComponent {
  constructor(private userFacade: UserFacade) {}

  public fetchUser() {
    this.userFacade.fetchUser();
  }
}
