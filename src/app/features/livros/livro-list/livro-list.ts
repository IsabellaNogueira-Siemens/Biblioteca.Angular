import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Livro } from '../../../../models/livro.model';
import { LivroService } from '../../../core/services/livro';
import { Observable, of } from 'rxjs'; // Importe Observable e of
import { catchError } from 'rxjs/operators'; // Importe catchError

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livro-list.html',
})
export class LivroListComponent implements OnInit {
  // A propriedade agora é um Observable!
  livros$!: Observable<Livro[]>;

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    // Não usamos mais .subscribe(). Apenas atribuímos o Observable.
    this.livros$ = this.livroService.getLivros().pipe(
      catchError(error => {
        console.error('Erro ao buscar livros:', error);
        // Retorna um observable com um array vazio em caso de erro
        return of([]);
      })
    );
  }

  deleteLivro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.deletarLivro(id).subscribe({
        next: () => {
          alert('Livro excluído com sucesso!');
          // Para recarregar a lista, simplesmente chamamos o método de novo
          this.loadLivros();
        },
        error: (err) => alert(err.error)
      });
    }
  }
}