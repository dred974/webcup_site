import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';

export const routes: Routes = [
    {
        path: '',
        component: ConnexionComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'inscription',
        component: InscriptionComponent
    }
];
