import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [MainComponent],
    imports: [CommonModule, HomeRoutingModule, MaterialModule],
})
export class HomeModule {}
