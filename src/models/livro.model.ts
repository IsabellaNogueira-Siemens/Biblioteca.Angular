export interface Livro {
    id: number;
    titulo: string;
    autorId: number;
    nomeAutor: string;  // Vem da nossa API
    generoId: number;
    nomeGenero: string; // Vem da nossa API
}

// DTO para criação, não precisamos de todos os campos
export interface CriarLivroDto {
  titulo: string;
  autorId: number;
  generoId: number;
}