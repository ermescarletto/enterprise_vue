// Politica.ts
export class Politica {
    id: number;
    empresa: {
        id: number;
        nome: string;
        pessoa_juridica: number;
    };
    departamento: {
        id: number;
        nome: string;
    };
    criado_em: string; // Consider using Date if you want to handle dates properly
    codigo_politica: string;
    titulo_politica: string;
    texto_politica: string;

    constructor(data: any) {
        this.id = data.id;
        this.empresa = data.empresa;
        this.departamento = data.departamento;
        this.criado_em = data.criado_em;
        this.codigo_politica = data.codigo_politica;
        this.titulo_politica = data.titulo_politica;
        this.texto_politica = data.texto_politica;
    }
}
