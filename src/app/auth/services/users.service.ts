import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserResponse } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private baseUrl: string = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private tokenStorageService: TokenStorageService
    ) {}

    getUserById(id: string, save: boolean = true): Observable<any> {
        const url = `${this.baseUrl}/users/${id}`;
        return this.http.get<UserResponse>(url).pipe(
            tap((response) => {
                if (response.data && save) {
                    this.tokenStorageService.saveUser(response);
                }
            }),
            map((response) => response),
            catchError((e) => of(e.error.message))
        );
    }
}
