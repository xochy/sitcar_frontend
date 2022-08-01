import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrencyResponse } from 'src/app/shared/interfaces/currency.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CurrencyService {
    private currencyURL: string = environment.currencyURL;
    private currencyToken: string = environment.currencyToken;

    constructor(private http: HttpClient) {}

    getUSDCurrency(): Observable<any> {
        let params = new HttpParams().append('token', this.currencyToken);

        return this.http
            .get<CurrencyResponse>(this.currencyURL, { params })
            .pipe(
                map((response) => response),
                catchError((e) => of(e.error.message))
            );
    }
}
