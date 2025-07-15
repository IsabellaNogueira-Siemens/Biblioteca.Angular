import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutorService } from '../../../core/services/autor';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './autor-form.html',
})
export class AutorFormComponent implements OnInit {
  autorForm: FormGroup;
  isEditMode = false;
  autorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.autorForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.autorId = +id;
      this.autorService.getAutor(this.autorId).subscribe(data => {
        this.autorForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.autorForm.invalid) {
      return;
    }

    if (this.isEditMode && this.autorId) {
      this.autorService.atualizarAutor(this.autorId, this.autorForm.value).subscribe(() => {
        this.router.navigate(['/autor']);
      });
    } else {
      this.autorService.criarAutor(this.autorForm.value).subscribe(() => {
        this.router.navigate(['/autor']);
      });
    }
  }
}