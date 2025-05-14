export class Groups{
    id!: number;
    name!: string;

    constructor(data: Partial<Groups> = {}) {
        Object.assign(this, data);
    }

    // Método estático para retornar labels humanizadas
    static getLabels() {
        return {
            id: 'ID',
            name: 'Nome do Grupo',
        };
    }
}