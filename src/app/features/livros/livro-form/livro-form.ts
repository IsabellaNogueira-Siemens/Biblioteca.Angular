import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LivroService } from '../../../core/services/livro';
import { AutorService } from '../../../core/services/autor'; // Importa AutorService
import { GeneroService } from '../../../core/services/genero'; // Importa GeneroService
import { Autor } from '../../../../models/autor.model';
import { Genero } from '../../../../models/genero.model';
import { forkJoin } from 'rxjs'; // Para fazer chamadas paralelas

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './livro-form.html',
})
export class LivroFormComponent implements OnInit {
  livroForm: FormGroup;
  isEditMode = false;
  livroId: number | null = null;
  autores: Autor[] = [];   // Array para guardar os autores
  generos: Genero[] = [];  // Array para guardar os generos

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private autorService: AutorService,   // Injeta AutorService
    private generoService: GeneroService, // Injeta GeneroService
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      autorId: [null, Validators.required], // Começa como nulo
      generoId: [null, Validators.required] // Começa como nulo
    });
  }

  ngOnInit(): void {
    this.loadAutoresEGeneros(); // Carrega os dropdowns

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.livroId = +id;
      // Busca o livro específico para preencher o formulário
      this.livroService.getLivro(this.livroId).subscribe(data => {
        this.livroForm.patchValue(data);
      });
    }
  }

  loadAutoresEGeneros(): void {
    forkJoin({
      autores: this.autorService.getAutores(),
      generos: this.generoService.getGeneros()
    }).subscribe({ // Use o objeto de observer para capturar erros
      next: ({ autores, generos }) => {
        this.autores = autores;
        this.generos = generos;
        console.log('Autores e Gêneros carregados com sucesso!', autores, generos);
      },
      error: (err) => {
        console.error('ERRO AO CARREGAR AUTORES/GÊNEROS:', err);
        alert('Falha ao carregar dados de autores ou gêneros. Verifique o console (F12).');
      }
    });
  }
  onSubmit(): void {
    if (this.livroForm.invalid) {
      return;
    }

    const livroData = this.livroForm.value;

    if (this.isEditMode && this.livroId) {
      this.livroService.atualizarLivro(this.livroId, livroData).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    } else {
      this.livroService.criarLivro(livroData).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    }
  }
}