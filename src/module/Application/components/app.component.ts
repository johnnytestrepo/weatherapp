import {Component, OnInit} from '@angular/core';
import {MapOptions} from '../models/mapOptionsModel';
import {ApiService} from '../services/api-service';
import {ApiRequest} from '../models/apiRequest';
import {MapCenter} from '../models/mapCenterModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    public options: MapOptions;
    public collapse: any = {
        weather: true,
        chart: true,
        response: true
    };
    private selectedPosition: any;
    public data: any = [];
    public chartData: any;

    constructor(private api: ApiService) {
    }

    public ngOnInit(): void {
        const center = {lat: 36.890257, lng: 30.707417};
        this.options = {
            center: center,
            zoom: 12
        };

        this.getInfoByCoord(center);
    }

    public getInfoByCoord(coord: MapCenter): void {
        let request: ApiRequest = {
            url: 'http://api.openweathermap.org/data/2.5/forecast',
            params: {
                'lat': coord.lat,
                'lon': coord.lng,
            }
        };

        this.api.sendRequest(request).then((data: any) => {
            this.data = data;
            this.generateChartData();
        });
    }

    public generateChartData(): void {
        let chartLabels = [];
        let chartValuesTemp = [];
        let chartValuesWind = [];

        this.data.list.map((item) => {
            chartLabels.push(item.dt_txt);
            chartValuesTemp.push(item.main.temp);
            chartValuesWind.push(item.wind.speed);
        });

        this.chartData = {
            labels: chartLabels,
            datasets: [{
                label: 'Temp',
                data: chartValuesTemp,
                fill: false,
                borderColor: '#4bc0c0'
            }, {
                label: 'Wind speed',
                data: chartValuesWind,
                fill: false,
                borderColor: '#4b3450'
            }]
        };
    }

    public handleMapClick(event): void {
        this.selectedPosition = event.latLng;
        this.getInfoByCoord({
            lat: this.selectedPosition.lat(),
            lng: this.selectedPosition.lng(),
        });
    }

}
