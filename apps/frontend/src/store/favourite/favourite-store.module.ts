import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { favouriteReducers } from './reducers';
import { favouriteEffects } from './effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    CommonModule,
    StoreModule.forFeature('favourite', favouriteReducers),
    EffectsModule.forFeature(favouriteEffects),
  ],
})
export class FavouriteStoreModule {}
