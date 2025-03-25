export class Automacao {
    id: number;
    automacao: number;
    data_hora: string;
    tipo_execucao: string;
    resposta: string;
    status: number;

    constructor(data: any){
        this.id = data.id;
        this.automacao = data.automacao;
        this.data_hora = data.data_hora;
        this.tipo_execucao = data.tipo_execucao;
        this.resposta = data.resposta;
        this.status = data.status;
    }
}