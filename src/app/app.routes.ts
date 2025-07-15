import { Routes } from '@angular/router';
import { GeneroListComponent } from './features/generos/genero-list/genero-list';
import { GeneroFormComponent } from './features/generos/genero-form/genero-form';

import { AutorListComponent } from './features/autores/autor-list/autor-list';
import { AutorFormComponent } from './features/autores/autor-form/autor-form';

import { LivroListComponent } from './features/livros/livro-list/livro-list';
import { LivroFormComponent } from './features/livros/livro-form/livro-form';
export const routes: Routes = [
    { path: 'generos', component: GeneroListComponent },
    { path: 'generos/novo', component: GeneroFormComponent },
    { path: 'generos/editar/:id', component: GeneroFormComponent }, // :id é um parâmetro

    { path: 'autores', component: AutorListComponent },
    { path: 'autores/novo', component: AutorFormComponent },
    { path: 'autores/editar/:id', component: AutorFormComponent },

    { path: 'livros', component: LivroListComponent },
    { path: 'livros/novo', component: LivroFormComponent },
    { path: 'livros/editar/:id', component: LivroFormComponent },

    { path: '', redirectTo: '/livros', pathMatch: 'full' },

    //{ path: '**', redirectTo: '/autores' }
];