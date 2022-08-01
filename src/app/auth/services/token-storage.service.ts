import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse } from 'src/app/shared/interfaces/user.interface';

/**
 * Identifies the user token provided by the server.
 * @date 31/7/2022 - 00:45:16
 *
 * @type {string}
 */
const TOKEN_KEY: string = 'auth-token';

/**
 * Identifies the user slug.
 * @date 31/7/2022 - 00:45:43
 *
 * @type {string}
 */
const SLUG_KEY: string = 'auth-slug';

/**
 * Identifies the user attributes.
 * @date 31/7/2022 - 00:46:08
 *
 * @type {string}
 */
const USER_KEY: string = 'auth-user';

@Injectable({
    providedIn: 'root',
})
export class TokenStorageService {
    /**
     * Current user value emmitted by the server.
     * @date 31/7/2022 - 00:47:02
     *
     * @private
     * @type {BehaviorSubject<UserResponse>}
     */
    private currentUserSubject: BehaviorSubject<UserResponse> =
        new BehaviorSubject({} as UserResponse);

    /**
     * Get the curretn user observable.
     * @date 31/7/2022 - 00:47:59
     *
     * @public
     * @readonly
     * @type {Observable<UserResponse>}
     */
    public readonly currentUser: Observable<UserResponse> =
        this.currentUserSubject.asObservable();

    /**
     * Creates an instance of TokenStorageService.
     * @date 31/7/2022 - 00:48:13
     *
     * @constructor
     */
    constructor() {}

    /**
     * Cleans the session storage.
     * @date 31/7/2022 - 00:48:44
     */
    cleanSessionStorage(): void {
        window.sessionStorage.clear();
        this.currentUserSubject.next({} as UserResponse);
    }

    /**
     * Saves the user token.
     * @date 31/7/2022 - 00:48:56
     *
     * @public
     * @param {string} token
     */
    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * Gets the user token.
     * @date 31/7/2022 - 00:49:26
     *
     * @public
     * @returns {(string | null)}
     */
    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    /**
     * Gets the user slug.
     * @date 31/7/2022 - 00:49:37
     *
     * @public
     * @param {string} slug
     */
    public saveSlug(slug: string): void {
        window.sessionStorage.removeItem(SLUG_KEY);
        window.sessionStorage.setItem(SLUG_KEY, slug);
    }

    /**
     * Gets the user slug.
     * @date 31/7/2022 - 00:50:33
     *
     * @public
     * @returns {(string | null)}
     */
    public getSlug(): string | null {
        return window.sessionStorage.getItem(SLUG_KEY);
    }

    /**
     * Saves the user response values obtained from the server.
     * @date 31/7/2022 - 00:50:48
     *
     * @public
     * @param {UserResponse} user
     */
    public saveUser(user: UserResponse): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

        this.saveSlug(user.data.id);

        this.currentUserSubject.next(user);
    }

    /**
     * Gets the user data.
     * @date 31/7/2022 - 00:51:09
     *
     * @public
     * @returns {UserResponse}
     */
    public getUser(): UserResponse {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {} as UserResponse;
    }
}
