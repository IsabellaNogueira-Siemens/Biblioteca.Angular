import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../../../models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
   private apiUrl = 'http://localhost:5004/api/generos'; //Ao usar https como estou na rede siemens o firewall bloqueia a porta 5001, então usei a 5004 e passei a usar http

  constructor(private http: HttpClient) { }

  // GET: /api/generos
  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.apiUrl);
  }

  // GET: /api/generos/{id}
  getGenero(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.apiUrl}/${id}`);
  }

  // POST: /api/generos
  criarGenero(genero: { nome: string }): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl, genero);
  }

  // PUT: /api/generos/{id}
  atualizarGenero(id: number, genero: { nome: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, genero);
  }

  // DELETE: /api/generos/{id}
  deletarGenero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}