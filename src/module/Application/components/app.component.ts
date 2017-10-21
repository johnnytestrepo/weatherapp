import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api-service';
import {ApiRequest} from '../models/apiRequest';

// Models
import {MapOptions} from '../models/mapOptionsModel';
import {MapCenter} from '../models/mapCenterModel';
import {ChartOption, ChartOptionValue} from '../models/chartOptionsModel';

// Constants
import {Api} from '../constants/api';

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
    private selectedPosition: MapCenter = {lat: 36.890257, lng: 30.707417};
    public data: any = [];

    // Info type
    public types: any = [
        {label: 'Current weather data', value: 'weather'},
        {label: '5 day / 3 hour forecast', value: 'forecast'},
    ];
    public selectedType: string = this.types[1].value;

    // Chart
    public chartData: any;
    public chartOptions: ChartOption[] = [
        {label: 'Temperature', value: {name: 'Temperature', field: 'temp'}},
        {label: 'Humidity', value: {name: 'Humidity', field: 'humidity'}},
        {label: 'Pressure', value: {name: 'Pressure', field: 'pressure'}},
    ];
    public selectedChartData: ChartOptionValue = this.chartOptions[0].value;

    constructor(private api: ApiService) {
    }

    public ngOnInit(): void {
        this.options = {
            center: this.selectedPosition,
            zoom: 12
        };

        this.getInfoByCoord();
    }

    public getInfoByCoord(): void {
        let request: ApiRequest = {
            url: this.getApiUrlByType(this.selectedType),
            params: {
                'lat': this.selectedPosition.lat,
                'lon': this.selectedPosition.lng,
                'units': 'metric',
            }
        };

        this.api.sendRequest(request).then((data: any) => {
            this.data = data;
            if (this.selectedType === 'forecast') {
                this.generateChartData();
            }
        });
    }

    public generateChartData(): void {
        let chartLabels = [];
        let chartValues = [];

        this.data.list.map((item) => {
            chartLabels.push(item.dt_txt);
            chartValues.push(item.main[this.selectedChartData.field]);
        });

        this.chartData = {
            labels: chartLabels,
            datasets: [{
                label: this.selectedChartData.name,
                data: chartValues,
                fill: false,
                borderColor: '#4bc0c0'
            }]
        };
    }

    public handleMapClick(event): void {
        this.selectedPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        this.getInfoByCoord();
    }

    public getApiUrlByType(type: string): string {
        switch (type) {
            case 'weather':
                return Api.CURRENT_WEATHER;
            case 'forecast':
                return Api.FIVE_DAYS_FORECAST;
            default:
                return '';
        }
    }

}
