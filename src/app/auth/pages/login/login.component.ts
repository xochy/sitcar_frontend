import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { MessageType } from 'src/app/shared/interfaces/snack-bar-message.interface';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ErrorMessageService } from 'src/app/shared/validators/error-message.service';
import { PatternValidatorService } from 'src/app/shared/validators/pattern-validator.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = this.formBuilder.group({
        email: [
            '',
            [
                Validators.required,
                Validators.pattern(this.patternValidatorService.emailPattern),
            ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        remember: true,
    });

    loading: boolean = false;

    hide: boolean = true;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private snackBarService: SnackBarService,
        private errorMessageService: ErrorMessageService,
        private patternValidatorService: PatternValidatorService
    ) {}

    ngOnInit(): void {
        //TODO: Delete form reset
        this.loginForm.reset({
            email: 'admin@admin.com',
            password: 'password',
        });
    }

    invalidField(field: string): boolean | undefined {
        return this.loginForm.get(field)?.invalid;
    }

    errorMessage(fieldName: string, showName: string): string {
        return this.errorMessageService.getErrorMessage(
            showName,
            this.loginForm.get(fieldName)?.errors
        );
    }

    login() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) {
            return;
        }

        const { email, password } = this.loginForm.value;

        this.loading = true;

        this.authService
            .login(email, password)
            .pipe(
                switchMap((response) => {
                    if (response.status_code === 200) {
                        return this.usersService.getUserById(response.slug);
                    }

                    return of(
                        this.snackBarService.show({
                            message: response,
                            action: 'Cerrar',
                            type: MessageType.error,
                        })
                    );
                }),
                finalize(() => (this.loading = false))
            )
            .subscribe((response) => {
                if (response) {
                    this.router.navigateByUrl('/profile');
                }
            });
    }
}
