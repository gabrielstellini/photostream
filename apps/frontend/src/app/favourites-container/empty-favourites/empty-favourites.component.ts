import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ps-empty-favourites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empty-favourites.component.html',
  styleUrls: ['./empty-favourites.component.scss'],
})
export class EmptyFavouritesComponent {}
