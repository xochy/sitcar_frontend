import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import localeES from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { MatPaginatorIntlEs } from './shared/lang/paginator-es';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeES);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        NgbModule,
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'es-MX',
        },
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
