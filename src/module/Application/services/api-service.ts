import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_KEY: string = '8eb54ecef33481c1cc88634695d774e4';

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient
    ) {

    }

    public getData(request: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Requested-With', 'XMLHttpRequest');

        let options = {
            headers: headers
        };

        this.http.get(request.url, options).subscribe(data => {

        });
    }

}
