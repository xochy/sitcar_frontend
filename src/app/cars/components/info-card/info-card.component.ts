import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styles: [],
})
export class InfoCardComponent implements OnInit {
    user!: User;
    roles: Role[] = [];
    canRegister: boolean = false;

    constructor(
        private router: Router,
        private rolesService: RolesService,
        private tokenStorageService: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.user = this.tokenStorageService.getUser().data;

        if (this.user) {
            this.rolesService
                .getRolesByRelatedUrl(
                    this.user.relationships.roles.links.related
                )
                .subscribe((response) => {
                    this.roles = response.data;

                    this.canRegister = !this.roles.some(
                        this.rolesService.hasCostumerRole
                    );
                });
        }
    }

    create() {
        this.router.navigateByUrl('/cars/create');
    }
}
