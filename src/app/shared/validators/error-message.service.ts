import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ErrorMessageService {
    constructor() {}

    getErrorMessage(
        showName: string,
        errors: ValidationErrors | null | undefined
    ) {
        if (errors?.required) {
            return `El campo ${showName} es obligatorio.`;
        } else if (errors?.minlength) {
            return `El campo ${showName} debe contener al menos dos caracteres.`;
        } else if (errors?.maxlength) {
            return `El campo ${showName} debe contener 50 caracteres o menos.`;
        } else if (errors?.pattern) {
            return `El campo ${showName} no tiene un formato válido.`;
        } else if (errors?.emailAlreadyRegistered) {
            return 'El correo electrónico ingresado ya ha sido utilizado.';
        } else if (errors?.teamAlreadyRegistered) {
            return 'El nombre del equipo ya ha sido utilizado.';
        } else if (errors?.curpAlreadyRegistered) {
            return 'La CURP ingresada ya ha sido utilizada.';
        } else if (errors?.schoolDoesNotExist) {
            return `Valor de ${showName} es incorrecto.`;
        }

        return '';
    }
}
