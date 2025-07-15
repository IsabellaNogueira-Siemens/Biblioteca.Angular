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
    // Não usamos mais .subscribe(). Apenas atribuímos o Observable. Treta demais usar .subscribe, bug onde a lista não atualiza
    // Agora, usamos o operador catchError para lidar com erros <- boas praticas
    this.livros$ = this.livroService.getLivros().pipe(
      catchError(error => {
        console.error('Erro ao buscar livros:', error);
        // Retorna um observable com um array vazio em caso de erro <- autlizando o erro e retornando um array vazio para evitar erros na UI e na lista
        return of([]);
      })
    );
  }

  deleteLivro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.deletarLivro(id).subscribe({
        next: () => {
          alert('Livro excluído com sucesso!');
          // Para recarregar a lista, simplesmente chamamos o método de novo, famosa recursão
          this.loadLivros();
        },
        error: (err) => alert(err.error)
      });
    }
  }
}