import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authCheckInterceptor } from './filter/authcheck-interceptor';

export const appConfig: ApplicationConfig = {
  //we added provideHttpClient() here to make HttpClient available application-wide
  providers: [provideHttpClient(withInterceptors([authCheckInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    
  ]
};
