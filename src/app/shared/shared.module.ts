import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

@NgModule({
    declarations: [NavbarComponent, FooterComponent, ErrorPageComponent],
    imports: [CommonModule, RouterModule, MaterialModule],
    exports: [NavbarComponent, FooterComponent]
})
export class SharedModule {}
