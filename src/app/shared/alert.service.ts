import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    constructor(private alert: MatSnackBar) { }

    error(msg: string, duration?: number) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['warn'];
        duration ? config.duration = duration * 1000 : config.duration = 10000;
        config.horizontalPosition = 'right';
        this.alert.open(msg, 'ok', config);
    }

    success(msg: string, duration?: number) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['primary'];
        duration ? config.duration = duration * 1000 : config.duration = 10000;
        config.horizontalPosition = 'right';
        this.alert.open(msg, 'ok', config);
    }

    warning(msg: string, duration?: number) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['accent'];
        duration ? config.duration = duration * 1000 : config.duration = 10000;
        config.horizontalPosition = 'right';
        this.alert.open(msg, 'ok', config);
    }
}
