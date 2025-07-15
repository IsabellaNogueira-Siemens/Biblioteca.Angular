import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../../models/autor.model';

@Injectable({ providedIn: 'root' })
export class AutorService {
  private apiUrl = 'http://localhost:5004/api/autores'; 

  constructor(private http: HttpClient) { }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  getAutor(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`);
  }

  criarAutor(autor: { nome: string }): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  atualizarAutor(id: number, autor: { nome: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, autor);
  }

  deletarAutor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}