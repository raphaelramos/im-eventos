import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

import { MatPaginatorIntl } from '@angular/material/paginator';

// external
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxMaskModule } from 'ngx-mask';

// layouts
import { LoginLayoutComponent } from './_layouts/login/login-layout.component';
import { PublicLayoutComponent } from './_layouts/public/public-layout.component';
import { PainelLayoutComponent } from './_layouts/painel/painel-layout.component';

// auth
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './auth/auth.module';

import { ApplicationErrorHandler } from './app.error-handler';
import { MatPaginatorIntlCro } from './app.pagination';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// shareds
import { TelPipeModule } from './shared/tel-pipe.module';
import { ngxUiLoaderConfig } from './shared/ngx-config';
import { DeleteDialogModule } from './shared/delete-dialog/delete-dialog.module';

// shared component
import { SobreComponent } from './sobre/sobre.component';

// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    PublicLayoutComponent,
    PainelLayoutComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'eventos' }),
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TelPipeModule,
    DeleteDialogModule,
    NgxMaskModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    RouterModule.forRoot(ROUTES),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatMenuModule, MatSidenavModule, MatButtonModule, MatCardModule, MatToolbarModule,
    MatIconModule, MatListModule, MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
