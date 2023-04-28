import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { photoReducers } from './reducers';
import { photoEffects } from './effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    CommonModule,
    StoreModule.forFeature('photo', photoReducers),
    EffectsModule.forFeature(photoEffects),
  ],
})
export class PhotoStoreModule {
  constructor() {
    console.log('PhotoStoreModule loaded');
  }
}
