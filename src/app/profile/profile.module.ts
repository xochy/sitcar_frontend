import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';

import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MaterialModule,
        MomentModule,
    ],
})
export class ProfileModule {}
