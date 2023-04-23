import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nestangular-template-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./app.component.html`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
