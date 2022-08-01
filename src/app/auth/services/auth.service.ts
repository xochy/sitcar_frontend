import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/shared/interfaces/auth-response.interface';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl: string = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private tokenStorageService: TokenStorageService
    ) {}

    login(email: string, password: string) {
        const body = { email, password };
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body).pipe(
            tap((response) => {
                if (response.plain_text_token) {
                    this.tokenStorageService.saveToken(
                        response.plain_text_token
                    );
                }
            }),
            map((response) => response),
            catchError((e) => of(e.error.message))
        );
    }

    validateToken() {
        const url = `${this.baseUrl}/validateToken`;
        const token = this.tokenStorageService.getToken();
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.get<AuthResponse>(url, { headers }).pipe(
            map((response) => {
                if (response.plain_text_token) {
                    this.tokenStorageService.saveToken(
                        response.plain_text_token
                    );
                    return true;
                } else {
                    return false;
                }
            }),
            catchError((error) => {
                return of(false);
            })
        );
    }
}
