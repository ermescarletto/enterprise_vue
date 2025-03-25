export class Unidade {
    id: number;
    codigo: number;
    nome: string;
    cnpj: string;
    empresa: number; // Referência ao ID da PessoaJuridica
    ativo: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.codigo = data.codigo;
        this.nome = data.nome;
        this.cnpj = data.cnpj;
        this.empresa = data.empresa;
        this.ativo = data.ativo;
    }
}