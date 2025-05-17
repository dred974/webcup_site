import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AddpostComponent } from './addpost/addpost.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
    {
        path: '',
        component: AccueilComponent
    },
    {
        path: 'connexion',
        component: ConnexionComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'inscription',
        component: InscriptionComponent
    },
    {
        path: 'addpost',
        component: AddpostComponent
    }
];
