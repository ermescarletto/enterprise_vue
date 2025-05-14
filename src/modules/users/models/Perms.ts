export class Perms {
    id!: number;
    name!: string;
    codename!: string;
    content_type_id!: number;
    
    constructor(data: Partial<Perms> = {}) {
        Object.assign(this, data);
    }
    
    // Método estático para retornar labels humanizadas
    static getLabels() {
        return {
        id: 'ID',
        name: 'Nome',
        codename: 'Código',
        content_type_id: 'Tipo de Conteúdo',
        };
    }
}