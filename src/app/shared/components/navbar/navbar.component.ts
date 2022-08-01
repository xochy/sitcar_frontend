import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { UserResponse } from '../../interfaces/user.interface';

/**
 * Elements for the navigation menu bar.
 * @date 30/7/2022 - 23:24:46
 *
 * @type {MenuItem[]}
 */
const NAVBAR_ITEMS: MenuItem[] = [
    {
        text: 'Inicio',
        route: './home',
        icon: 'home',
    },
    {
        text: 'Autos',
        route: './cars',
        icon: 'directions_car',
    },
];

/**
 * Elements for the navigation menu bar when user is not logged.
 * @date 30/7/2022 - 23:25:15
 *
 * @type {MenuItem[]}
 */
const GUESS_ITEMS: MenuItem[] = [
    {
        text: 'Ingresar',
        route: './auth/login',
        icon: 'login',
    },
];

/**
 * Elements for the navigation menu bar when user is logged.
 * @date 30/7/2022 - 23:25:36
 *
 * @type {MenuItem[]}
 */
const USER_ITEMS: MenuItem[] = [
    {
        text: 'Perfil',
        route: './profile',
    },
];

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    /**
     * Logged user when is not empty.
     * @date 31/7/2022 - 00:37:19
     *
     * @type {!UserResponse}
     */
    currentUser!: UserResponse;

    /**
     * Subscription for the token storage services.
     * @date 31/7/2022 - 00:38:34
     *
     * @private
     * @type {(Subscription | undefined)}
     */
    private userServiceSubscription: Subscription | undefined;

    /**
     * Elements for the navigation menu bar.
     * @date 31/7/2022 - 00:38:56
     *
     * @public
     * @type {MenuItem[]}
     */
    public navbarItems: MenuItem[] = [];

    /**
     * Elements for the navigation menu bar when user is not logged.
     * @date 31/7/2022 - 00:39:17
     *
     * @public
     * @type {MenuItem[]}
     */
    public guessItems: MenuItem[] = [];

    /**
     * Elements for the navigation menu bar when user is logged.
     * @date 31/7/2022 - 00:40:12
     *
     * @readonly
     * @type {MenuItem[]}
     */
    get userItems(): MenuItem[] {
        return USER_ITEMS;
    }

    /**
     * Determinates if the directory is profile to set selected effect.
     * @date 31/7/2022 - 00:40:52
     *
     * @readonly
     * @type {boolean}
     */
    get isDirectoryPath(): boolean {
        return this.router.url.includes('profile');
    }

    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) {}

    /**
     * Handle any additional initialization tasks.
     * @date 31/7/2022 - 00:52:21
     */
    ngOnInit(): void {
        this.userServiceSubscription =
            this.tokenStorageService.currentUser.subscribe((value) => {
                if (value.data) {
                    this.currentUser = value;
                } else {
                    this.currentUser = this.tokenStorageService.getUser();
                }

                this.navbarItems = NAVBAR_ITEMS;

                if (this.currentUser.data) {
                    this.navbarItems = NAVBAR_ITEMS.filter(
                        (item) => !GUESS_ITEMS.includes(item)
                    );
                } else {
                    this.navbarItems = [...NAVBAR_ITEMS, ...GUESS_ITEMS];
                }
            });
    }

    /**
     * Unsubscribe user sevice subscription when service is destroyed.
     * @date 31/7/2022 - 00:52:24
     */
    ngOnDestroy(): void {
        this.userServiceSubscription?.unsubscribe();
    }

    /**
     * Called when user is logged out. Returns to the home main page.
     * @date 31/7/2022 - 00:52:55
     *
     * @public
     */
    public logout() {
        this.tokenStorageService.cleanSessionStorage();
        this.router.navigateByUrl('/home/main');
        this.ngOnInit();
    }
}
