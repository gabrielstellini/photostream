import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ps-page-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.scss'],
})
export class PageSpinnerComponent {}
