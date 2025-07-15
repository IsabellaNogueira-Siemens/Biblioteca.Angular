import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GeneroService } from '../../../core/services/genero';

@Component({
  selector: 'app-genero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './genero-form.html',
})
export class GeneroFormComponent implements OnInit {
  generoForm: FormGroup;
  isEditMode = false;
  generoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.generoForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.generoId = +id;
      this.generoService.getGenero(this.generoId).subscribe(data => {
        this.generoForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.generoForm.invalid) {
      return;
    }

    if (this.isEditMode && this.generoId) {
      this.generoService.atualizarGenero(this.generoId, this.generoForm.value).subscribe(() => {
        this.router.navigate(['/generos']);
      });
    } else {
      this.generoService.criarGenero(this.generoForm.value).subscribe(() => {
        this.router.navigate(['/generos']);
      });
    }
  }
}