// Politica.ts
export class PessoaJuridica {
    id: number;
    nome_fantasia: string;
    razao_social: string;
    cnpj: string;
    inscricao_estadual: string;
    email: string;
    telefone: string;

    constructor(data: any) {
        this.id = data.id;
        this.nome_fantasia = data.nome_fantasia;
        this.razao_social = data.razao_social;
        this.cnpj = data.cnpj;
        this.inscricao_estadual= data.inscricao_estadual;
        this.email = data.email;
        this.telefone = data.telefone;
      
    }
}
