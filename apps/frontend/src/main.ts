import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';

// These should be disabled on the prod build
const developmentImports = [];

bootstrapApplication(AppComponent, {
  providers: [
    provideEffects(),
    provideStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      StoreDevtoolsModule.instrument({
        maxAge: 40,
        logOnly: true,
        autoPause: true,
      }),
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
      EffectsModule.forRoot([])
    ),
  ],
}).catch((err) => console.error(err));
