import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ToolbarComponent],
  selector: 'ps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
