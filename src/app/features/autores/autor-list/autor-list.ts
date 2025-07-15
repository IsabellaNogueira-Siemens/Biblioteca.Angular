// src/app/features/autores/autor-list/autor-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Autor } from '../../../../models/autor.model';
import { AutorService } from '../../../core/services/autor';
import { Observable, of } from 'rxjs'; // Importe Observable e of
import { catchError } from 'rxjs/operators'; // Importe catchError

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // CommonModule já importa o async pipe
  templateUrl: './autor-list.html',
})
export class AutorListComponent implements OnInit {
  // A propriedade agora é um Observable!
  autores$!: Observable<Autor[]>;

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    // Não usamos mais .subscribe(). Apenas atribuímos o Observable.
    this.autores$ = this.autorService.getAutores().pipe(
      catchError(error => {
        console.error('Erro ao buscar autores:', error);
        // Retorna um observable com um array vazio em caso de erro
        return of([]); 
      })
    );
  }

  deleteAutor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.autorService.deletarAutor(id).subscribe({
        next: () => {
          alert('Autor excluído com sucesso!');
          // Para recarregar a lista, simplesmente chamamos o método de novo
          this.loadAutores();
        },
        error: (err) => alert(err.error)
      });
    }
  }
}