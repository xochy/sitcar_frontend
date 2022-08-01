import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { CurrencyService } from '../../services/currency.service';

@Component({
    selector: 'app-price-cell',
    templateUrl: './price-cell.component.html',
    styles: [],
})
export class PriceCellComponent implements OnInit {
    @Input() priceMX!: number;

    price!: number;
    isUSDPrice: boolean = false;

    constructor(private currencyService: CurrencyService) {}

    ngOnInit(): void {
        this.price = this.priceMX;
    }

    onToggle(event: MatSlideToggleChange) {
        if (event.checked) {
            this.currencyService.getUSDCurrency().subscribe((response) => {
                this.price =
                    this.priceMX /
                    parseInt(response.bmx.series[0].datos[0].dato);

                this.isUSDPrice = true;
            });
        } else {
            this.price = this.priceMX;
            this.isUSDPrice = false;
        }
    }
}
