import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  IsActiveMatchOptions,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ps-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    RouterLinkActive,
  ],
})
export class ToolbarComponent {
  public options: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    paths: 'subset',
    fragment: 'exact',
  };
}
