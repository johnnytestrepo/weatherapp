// Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PanelModule} from 'primeng/primeng';
import {GMapModule} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';

// Components
import {AppComponent} from './components/app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        PanelModule,
        GMapModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
