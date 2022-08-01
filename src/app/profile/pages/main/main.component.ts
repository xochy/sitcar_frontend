import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styles: [
        `
            .example-card {
                max-width: 400px;
            }

            .example-header-image {
                background-image: url('https://ui-avatars.com/api/?name=X+Y');
                background-size: cover;
            }
        `,
    ],
})
export class MainComponent implements OnInit {
    user!: User;
    roles: Role[] = [];

    constructor(
        private router: Router,
        private rolesService: RolesService,
        private tokenStorageService: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.user = this.tokenStorageService.getUser().data;

        if (this.user) {
            this.rolesService
                .getRolesByRelatedUrl(this.user.id)
                .subscribe((response) => {
                    this.roles = response.data;
                });
        }
    }

    public logout() {
        this.tokenStorageService.cleanSessionStorage();
        this.router.navigateByUrl('/home/main');
        this.ngOnInit();
    }
}
