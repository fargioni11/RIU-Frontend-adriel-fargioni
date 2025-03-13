import { Routes } from '@angular/router';


export const routes: Routes = [
    {path: '', redirectTo: 'superheroes', pathMatch: 'full'},
    {path: 'superheroes', loadChildren: () => import('./features/superhero/superhero.routes')},
    {path: '**', redirectTo: 'superheroes'}
];
