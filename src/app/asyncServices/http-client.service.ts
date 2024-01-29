import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, exhaustMap, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginModel } from '../shared/models/login.model';


const ENV_APP_CONFIG = environment.ROOTURL

interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: Object;
}

@Injectable()
export class HttpClientService {
    private API_RETRY_COUNT = 0;
    private api = ENV_APP_CONFIG;



    public constructor (public http: HttpClient) {

    }

    private _getRequestHeader(customHeaders?: Map<string, string>) {
        const options = {} as IRequestOptions;

        let commonHttpHeader = new HttpHeaders()
        commonHttpHeader = commonHttpHeader.set('lang', 'en');
        commonHttpHeader = commonHttpHeader.set('Authorization', 'Bearer ' + localStorage.access_token);

        const baseApiUrl = ENV_APP_CONFIG

        if (baseApiUrl) {
            commonHttpHeader = commonHttpHeader.set('Base-Api-Url', baseApiUrl)
        }

        if (customHeaders) {
            customHeaders.forEach((value, key) =>
                commonHttpHeader = commonHttpHeader.set(key, value));
        }
        options.headers = commonHttpHeader;
        return options;
    }

    private _onRequestSuccess (method, fullUrl, data) {
        console.log(method, ': method')
        console.log(fullUrl, ': fullUrl')
        console.log(data)
    }
    private _onRequestFailed (method, fullUrl, error) {
        console.warn('HTTP call failed:');
        console.log(fullUrl);
        console.log(error);
    }

    public get<ServerModel>(endPoint: string, params?: string | Object, customHeaders?: Map<string, string>): Observable<ServerModel> {
        const options = this._getRequestHeader(customHeaders);
        let fullUrl = this.api + endPoint
        let urlParams = '';

        if (params && typeof params === 'string') {
            urlParams = params
        } else if (params && typeof params === 'object') {
            urlParams = '?';
            const queryString = [];
            for (const key in params) {
                if (key) {
                    queryString.push(key + '=' + params[key]);
                }
            }
            urlParams += queryString.join('&');
        }
        fullUrl += urlParams

        return this.http.get<ServerModel>(fullUrl, options).pipe(
            retry(this.API_RETRY_COUNT),
            tap(
                data => this._onRequestSuccess('GET', endPoint, data),
                error => this._onRequestFailed('GET', endPoint, error)
            )
        )
    }
   public post<ServerModel>(endPoint: string, params: Object, customHeaders?: Map<string, string>): Observable<ServerModel> {

       const options = this._getRequestHeader(customHeaders);
       const fullUrl = this.api + endPoint + '/';


       return this.http.post<ServerModel>(fullUrl, params, options).pipe(
           retry(this.API_RETRY_COUNT),
           tap(
               data => this._onRequestSuccess('POST', endPoint, data),
               error => this._onRequestFailed('POST', endPoint, error)
           )
       );
   }
   public put<ServerModel>(endPoint: string, params: Object): Observable<ServerModel> {
       const options = this._getRequestHeader();
       const fullUrl = this.api + '/ajax/' + endPoint + '/';

       return this.http.put<ServerModel>(fullUrl, options).pipe(
           retry(this.API_RETRY_COUNT),
           tap(
               data => this._onRequestSuccess('PUT', endPoint, data),
               error => this._onRequestFailed('PUT', endPoint, error)
           )
       );
   }

   public delete<ServerModel>(endPoint: string, params: Object, customHeaders?): Observable<ServerModel> {
       const options = this._getRequestHeader(customHeaders);
       const fullUrl = this.api + endPoint + '/';

       return this.http.delete<ServerModel>(fullUrl, options).pipe(
           retry(this.API_RETRY_COUNT),
           tap(
               data => this._onRequestSuccess('DELETE', endPoint, data),
               error => this._onRequestFailed('DELETE', endPoint, error)
           )
       )
   }
}

export function applicationHttpClientCreator (
   http: HttpClient
) {
   return new HttpClientService(http);
}


