export class Cidade {

        id: number;
        nome: string;
        estado: string;
        cep_de: number;
        cep_ate: number;
        
    
    constructor(data: any) {
        this.id = data.id;
        this.nome = data.nome;
        this.estado = data.estado;
        this.cep_de = data.cep_de;
        this.cep_ate = data.cep_ate;
    }
}
