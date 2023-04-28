import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    importProvidersFrom(
      CommonModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),
    importProvidersFrom(
      StoreModule.forRoot(
        {
          router: routerReducer,
        },
        {
          runtimeChecks: {
            strictActionImmutability: true,
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionWithinNgZone: true,
            strictActionTypeUniqueness: true,
          },
        }
      ),
      EffectsModule.forRoot([]),

      StoreDevtoolsModule.instrument({
        maxAge: 40,
        logOnly: true,
        autoPause: true,
      })
    ),
  ],
}).catch((err) => console.error(err));
