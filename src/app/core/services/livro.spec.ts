import { TestBed } from '@angular/core/testing';
import { LivroService } from '../../core/services/livro';

describe('Livro', () => {
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
