// pessoaService.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();

const API_URL = 'http://localhost:8000/cadastros/api/pessoasfisicas/';




export class PessoaFisica {
  id: number;
  nome: string;
  data_nascimento: string;
  cpf: string;
  sexo: string;
  email: string;
  telefone: string;

  constructor(
    id: number,
    nome: string,
    data_nascimento: string,
    cpf: string,
    sexo: string,
    email: string,
    telefone: string
  ) {
    this.id = id;
    this.nome = nome;
    this.data_nascimento = data_nascimento;
    this.cpf = cpf;
    this.sexo = sexo;
    this.email = email;
    this.telefone = telefone;
  }

}

export const pessoaService = {
  getAll() {
    return axios.get(API_URL, {
      headers: {
        Authorization: 'TOKEN ' + auth.token,
      },
    });
  },
  
  create(data: PessoaFisica) {
    return axios.post(API_URL, data, {
      headers: {
        Authorization: 'TOKEN ' + auth.token,
        'Content-Type': 'application/json',
      },
    });
  },

  // Update an existing record
  update(id: number, data: PessoaFisica) {
    return axios.put(`${API_URL}${id}/`, data, {
      headers: {
        Authorization: 'TOKEN ' + auth.token,
        'Content-Type': 'application/json',
      },
    });
  },

  delete(id: number) {
    return axios.delete(`${API_URL}${id}/`, {
      headers: {
        Authorization: 'TOKEN ' + auth.token,
      },
    });
  },
};
