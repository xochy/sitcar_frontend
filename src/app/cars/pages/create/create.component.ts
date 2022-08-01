import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { CarBlank } from 'src/app/shared/interfaces/car-data.interface';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { MessageType } from 'src/app/shared/interfaces/snack-bar-message.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ErrorMessageService } from 'src/app/shared/validators/error-message.service';
import { CarsService } from '../../services/cars.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
    carForm: FormGroup = this.formBuilder.group({
        name: [
            '',
            [
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(2),
            ],
        ],
        trademark: [
            '',
            [
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(2),
            ],
        ],
        price: [
            '',
            [
                Validators.required,
                Validators.max(1000000),
                Validators.min(10000),
            ],
        ],
        year: [
            '',
            [Validators.required, Validators.max(2022), Validators.min(1950)],
        ],
    });

    loading: boolean = false;
    toUpdate: boolean = false;
    canBuy: boolean = false;
    carId!: string;

    textButton: string = 'Registrar vehículo';

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private carsService: CarsService,
        private activatedRoute: ActivatedRoute,
        private snackBarService: SnackBarService,
        private errorMessageService: ErrorMessageService,

    ) {}

    ngOnInit(): void {
        if (this.router.url.includes('edit')) {
            this.textButton = 'Actualizar vehículo';
            this.toUpdate = true;
            this.setEditableValues();
        }
    }

    private setEditableValues(): void {
        this.activatedRoute.params
            .pipe(switchMap(({ id }) => this.carsService.getCarById(id)))
            .subscribe((response) => {
                this.carForm.reset({
                    name: response.data.attributes.name,
                    trademark: response.data.attributes.trademark,
                    price: response.data.attributes.price,
                    year: response.data.attributes.year,
                });
                this.carId = response.data.id;
            });
    }

    invalidField(field: string): boolean | undefined {
        return this.carForm.get(field)?.invalid;
    }

    errorMessage(fieldName: string, showName: string): string {
        return this.errorMessageService.getErrorMessage(
            showName,
            this.carForm.get(fieldName)?.errors
        );
    }

    create() {
        this.carForm.markAllAsTouched();

        if (this.carForm.invalid) {
            return;
        }

        const carBlank: CarBlank = {
            data: {
                id: this.carId,
                type: 'cars',
                attributes: {
                    name: this.carForm.get('name')?.value,
                    price: this.carForm.get('price')?.value,
                    trademark: this.carForm.get('trademark')?.value,
                    year: this.carForm.get('year')?.value,
                },
            },
        };

        this.loading = true;

        if (!this.toUpdate) {
            this.carsService
                .createCar(carBlank)
                .pipe(finalize(() => (this.loading = false)))
                .subscribe((response) => {
                    if (response) {
                        this.snackBarService.show({
                            message:
                                'El vehículo se ha registrado correctamente.',
                            action: 'Cerrar',
                            type: MessageType.success,
                        });

                        this.router.navigateByUrl('/cars/main');
                    }
                });
        } else {
            this.carsService
                .updateCar(carBlank)
                .pipe(finalize(() => (this.loading = false)))
                .subscribe((response) => {
                    if (response) {
                        this.snackBarService.show({
                            message:
                                'El vehículo se ha actualizado correctamente.',
                            action: 'Cerrar',
                            type: MessageType.success,
                        });

                        this.router.navigateByUrl('/cars/main');
                    }
                });
        }
    }
}
