import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import { routing, appRoutingProviders } from './app-routing.module'

import { AppComponent } from './app.component';
import { AdminComponent } from './admin';
import { DashboardComponent } from './dashboard';
import { ChartComponent } from './shared/components/chart/chart.component';
import { MapComponent } from './shared/components/map/map.component';
import { MapService } from './shared/services/map.service';
import { ChartConfigComponent } from './chart-config/chart-config.component';
import { SafeJsonPipe } from 'angular2-prettyjson/index';
import {TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService} from 'ng2-translate/ng2-translate';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        ChartComponent,
        MapComponent,
        DashboardComponent,
        ChartConfigComponent,
        SafeJsonPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    providers: [
        appRoutingProviders,
        MapService,
        TranslateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
