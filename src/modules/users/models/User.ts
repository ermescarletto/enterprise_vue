export class Usuario {
    id!: number;
    first_name!: string;
    last_name!: string;
    username!: string;
    email!: string;
    cpf!: string;
    telefone!: string;
    data_nascimento!: string;
    password_set!: boolean;
    groups!: number[];
    user_permissions!: number[];
    is_admin!: boolean;
    is_staff!: boolean;

    constructor(data: Partial<Usuario> = {}) {
        Object.assign(this, data);
    }

    get fullName() {
        return `${this.first_name} ${this.last_name}`;
    }
}