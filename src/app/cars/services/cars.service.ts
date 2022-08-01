import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { CarBlank } from 'src/app/shared/interfaces/car-data.interface';
import {
    CarResponse,
    CarsResponse,
} from 'src/app/shared/interfaces/car.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CarsService {
    private baseUrl: string = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private tokenStorageService: TokenStorageService
    ) {}

    getCarsWithParams(params: HttpParams): Observable<any> {
        return this.http
            .get<CarsResponse>(`${this.baseUrl}/cars`, { params })
            .pipe(
                map((response) => response),
                catchError((e) => of(e.error.message))
            );
    }

    getCarById(id: string) {
        return this.http.get<CarResponse>(`${this.baseUrl}/cars/${id}`).pipe(
            map((response) => response),
            catchError((e) => of(e.error.message))
        );
    }

    createCar(carBlank: CarBlank) {
        const token = this.tokenStorageService.getToken();
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/vnd.api+json')
            .set('Accept', 'application/vnd.api+json');

        return this.http
            .post<CarResponse>(`${this.baseUrl}/cars`, carBlank, {
                headers,
            })
            .pipe(
                map((response) => response),
                catchError((e) => of(e.error.message))
            );
    }

    updateCar(carBlank: CarBlank) {
        const token = this.tokenStorageService.getToken();
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/vnd.api+json')
            .set('Accept', 'application/vnd.api+json');

        return this.http
            .patch<CarResponse>(
                `${this.baseUrl}/cars/${carBlank.data.id}`,
                carBlank,
                {
                    headers,
                }
            )
            .pipe(
                map((response) => response),
                catchError((e) => of(e.error.message))
            );
    }
}
