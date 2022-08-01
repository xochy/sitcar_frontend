import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PatternValidatorService {
    public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public phonePattern: string = '^[0-9]{10}$';
    public curpPattern: string =
        '[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?';
    constructor() {}
}
