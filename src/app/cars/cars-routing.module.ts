import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { MainComponent } from './pages/main/main.component';
import { ShowComponent } from './pages/show/show.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'main',
                component: MainComponent,
            },
            {
                path: 'create',
                component: CreateComponent,
            },
            {
                path: 'show/:id',
                component: ShowComponent,
            },
            {
                path: 'edit/:id',
                component: CreateComponent,
            },
            {
                path: '**',
                redirectTo: 'main',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CarsRoutingModule {}
