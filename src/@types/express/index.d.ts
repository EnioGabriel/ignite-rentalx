// Sobreescreve os tipos da lib Express e adiciona o user para ser utilizado
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
