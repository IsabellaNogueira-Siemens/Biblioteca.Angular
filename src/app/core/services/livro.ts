import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro, CriarLivroDto } from '../../../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = 'http://localhost:5004/api/livros'; // <- URL HTTP

  constructor(private http: HttpClient) { }

  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  getLivro(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }
  
  // O DTO de criação é um pouco diferente do modelo Livro
  criarLivro(livro: CriarLivroDto): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }
  
  // O DTO de atualização também é diferente
  atualizarLivro(id: number, livro: CriarLivroDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, livro);
  }

  deletarLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}