import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ps-content-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './content-spinner.component.html',
  styleUrls: ['./content-spinner.component.scss'],
})
export class ContentSpinnerComponent {
  @Input() public loading = false;
}
