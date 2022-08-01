import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { CarsRoutingModule } from './cars-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { ShowComponent } from './pages/show/show.component';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { CarsTableComponent } from './components/cars-table/cars-table.component';
import { PriceCellComponent } from './components/price-cell/price-cell.component';

@NgModule({
    declarations: [
        CreateComponent,
        ShowComponent,
        MainComponent,
        InfoCardComponent,
        CarsTableComponent,
        PriceCellComponent,
    ],
    imports: [
        CommonModule,
        CarsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ],
})
export class CarsModule {}
