import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role, RolesResponse } from '../interfaces/role.interface';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getRolesByRelatedUrl(rolesUrl: string): Observable<RolesResponse | any> {
        return this.http.get<RolesResponse>(rolesUrl).pipe(
            map((response) => response),
            catchError((e) => of(e.error.message))
        );
    }

    hasCostumerRole(role: Role): boolean {
        return role.attributes.name == 'costumer';
    }
}
