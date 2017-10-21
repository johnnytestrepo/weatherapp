// Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {JsonpModule} from '@angular/http';
import {DataListModule, DataTableModule, DropdownModule, ChartModule, FieldsetModule, GMapModule, PanelModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

// Components
import {AppComponent} from './components/app.component';

// Providers
import {ApiService} from './services/api-service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        PanelModule,
        GMapModule,
        FieldsetModule,
        ChartModule,
        DropdownModule,
        JsonpModule,
        DataListModule,
        DataTableModule,
        FormsModule,
    ],
    providers: [
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
