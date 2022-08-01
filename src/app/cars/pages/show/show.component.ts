import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/shared/interfaces/car.interface';
import { CarBlank } from 'src/app/shared/interfaces/car-data.interface';
import { CarsService } from '../../services/cars.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
    car!: Car;
    user!: User;
    roles: Role[] = [];
    canBuy: boolean = false;
    loading: boolean = false;

    constructor(
        private carsService: CarsService,
        private rolesService: RolesService,
        private activatedRoute: ActivatedRoute,
        private tokenStorageService: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(switchMap(({ id }) => this.carsService.getCarById(id)))
            .subscribe((response) => {
                this.car = response.data;
            });

        this.user = this.tokenStorageService.getUser().data;

        if (this.user) {
            this.rolesService
                .getRolesByRelatedUrl(this.user.id)
                .subscribe((response) => {
                    this.roles = response.data;

                    this.canBuy = this.roles.some(
                        this.rolesService.hasCostumerRole
                    );
                });
        }
    }

    buy() {
        const carBlank: CarBlank = {
            data: {
                id: this.car.id,
                type: 'cars',
                attributes: {
                    sold: true,
                },
            },
        };

        this.loading = true;
        this.carsService.updateCar(carBlank).subscribe((response) => {
            if (response) {
                this.car.attributes.sold = true;
            }
            this.loading = false;
        });
    }
}
