import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageType, SnackBarMessage } from '../interfaces/snack-bar-message.interface';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}

    public show(snackBarMessage: SnackBarMessage, duration: number = 5000) {
        this.snackBar.open(snackBarMessage.message, snackBarMessage.action, {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: duration,
            panelClass: this.getPanelClass(snackBarMessage.type),
        });
    }

    private getPanelClass(type: MessageType) {
        switch (type) {
            case MessageType.success:
                return ['success-snackbar'];
            case MessageType.error:
                return ['error-snackbar'];
            case MessageType.warning:
                return ['warning-snackbar'];
            default:
                return ['info-snackbar'];
        }
    }
}
