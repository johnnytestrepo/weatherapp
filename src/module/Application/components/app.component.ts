import {Component, OnInit} from '@angular/core';
import {MapOptions} from '../models/mapOptionsModel';
import {ApiService} from '../services/api-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private appid: string = '8eb54ecef33481c1cc88634695d774e4';
    public options: MapOptions;
    private selectedPosition: any;

    public chartFieldsetCollapse: boolean = true;
    public responseFieldsetCollapse: boolean = true;

    public loading: boolean = true;
    public weather: any;
    public periods: any[] = [];
    public selectedPeriod: any;

    public chartData: any;

    constructor(
        private api: ApiService
    ) {
        this.periods.push({label: 'Select City', value: null});
        this.periods.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };
    }

    public ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
    }

    public handleMapClick(event) {
        this.selectedPosition = event.latLng;
        this.loading = true;

        let request: any = {
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
                'lat': this.selectedPosition.lat(),
                'lng': this.selectedPosition.lng(),
            }
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Requested-With', 'XMLHttpRequest');

        /*this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.selectedPosition.lat()}&lon=${this.selectedPosition.lng()}&appid=${this.appid}`).subscribe(data => {
            this.weather = data;
            this.loading = false;
        });*/
    }

}
