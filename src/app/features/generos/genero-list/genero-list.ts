import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Genero } from '../../../../models/genero.model';
import { GeneroService } from '../../../core/services/genero';
import { Observable, of } from 'rxjs'; // Importe Observable e of
import { catchError } from 'rxjs/operators'; // Importe catchError

@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './genero-list.html',
})
export class GeneroListComponent implements OnInit {
  // A propriedade agora é um Observable!
  generos$!: Observable<Genero[]>;

  constructor(private generoService: GeneroService) {}

  ngOnInit(): void {
    this.loadGeneros();
  }

  loadGeneros(): void {
    // Não usamos mais .subscribe(). Apenas atribuímos o Observable.
    this.generos$ = this.generoService.getGeneros().pipe(
      catchError(error => {
        console.error('Erro ao buscar gêneros:', error);
        // Retorna um observable com um array vazio em caso de erro
        return of([]);
      })
    );
  }

  deleteGenero(id: number): void {
    if (confirm('Tem certeza que deseja excluir este gênero?')) {
      this.generoService.deletarGenero(id).subscribe({
        next: () => {
          alert('Gênero excluído com sucesso!');
          // Para recarregar a lista, simplesmente chamamos o método de novo
          this.loadGeneros();
        },
        error: (err) => alert(err.error)
      });
    }
  }
}