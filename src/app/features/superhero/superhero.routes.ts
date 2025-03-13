import { Routes } from '@angular/router';

const SuperheroRoutes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
     }
]

export default SuperheroRoutes;