import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';  // Import your component

export const routes = [
  { path: '', component: ChatInterfaceComponent }  // Default route
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Pass the routes directly here
    provideClientHydration()
  ]
};
