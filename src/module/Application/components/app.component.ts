import {Component, OnInit} from '@angular/core';
import {MapOptions} from "../models/mapOptionsModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public options: MapOptions;
    private selectedPosition: any;
    public results: string[];

    constructor(private http: HttpClient) {
    }

    public ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
    }

    public handleMapClick(event) {
        this.selectedPosition = event.latLng;

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Requested-With', 'XMLHttpRequest');

        this.http.get(`http://samples.openweathermap.org/data/2.5/weather?lat=${this.selectedPosition.lat()}&lon=${this.selectedPosition.lng()}`, {
            headers: headers
        }).subscribe(data => {
            this.results = data['results'];
            console.log(this.results);
        });
    }

}
