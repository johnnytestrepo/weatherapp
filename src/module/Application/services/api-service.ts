import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Jsonp} from '@angular/http';
import {ApiRequest} from '../models/apiRequest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const API_KEY: string = '8eb54ecef33481c1cc88634695d774e4';

@Injectable()
export class ApiService {
    constructor(private jsonp: Jsonp) {
    }

    public sendRequest(request: any): Promise<any> {
        return this.jsonp.get(request.url, this.getRequestOptions(request)).map((response: any) => {
            if (!response.ok) return false;
            return response.json();
        }).toPromise();
    }

    private getRequestOptions(request: ApiRequest): RequestOptions {
        request.params['appid'] = API_KEY;
        request.params['callback'] = 'JSONP_CALLBACK';

        return new RequestOptions({
            params: request.params,
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            })
        });
    }
}
