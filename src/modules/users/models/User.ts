export class Usuario {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
    password_set: boolean;
    groups: [number];
    user_permissions: [number];
    is_admin: boolean;
    is_staff: boolean;

    constructor(data: any){
        this.id = data.id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.username = data.username;
        this.email = data.email;
        this.cpf = data.cpf;
        this.telefone = data.telefone;
        this.data_nascimento = data.data_nascimento;
        this.password_set = data.password_set;
        this.groups = data.groups;
        this.user_permissions = data.user_permissions;
        this.is_admin = data.is_admin;
        this.is_staff = data.is_staff;
    }
}