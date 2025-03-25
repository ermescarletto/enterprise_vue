import { Usuario } from "@/modules/users/models/User";
import { Unidade } from "./Unidade";

export class Gerente {
    id: number;
    usuario: Usuario; // Referência ao ID do usuário
    unidades: Unidade[]; // Lista de IDs das unidades
    ativo: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.usuario = data.usuario;
        this.unidades = data.unidades || [];
        this.ativo = data.ativo;
    }
}
