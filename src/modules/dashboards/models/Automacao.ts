export class Automacao {
    id: number;
    nome: string;
    url: string;
    token: string;
    ativo: boolean;
    recorrencia: string;
    dt_criacao: string;

    constructor(data: any){
        this.id = data.id;
        this.nome = data.nome;
        this.url = data.url;
        this.token = data.token;
        this.ativo = data.ativo;
        this.recorrencia = data.recorrencia;
        this.dt_criacao = data.dt_criacao;
    }
}