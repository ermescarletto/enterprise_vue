import { useI18n } from 'vue-i18n'; // Importa a função useI18n para tradução
import { Groups } from './Groups';
import { Perms } from './Perms';

export class User {
  id!: number;
  first_name!: string | null;
  last_name!: string | null;
  username!: string;
  email!: string;
  cpf!: string;
  telefone!: string;
  data_nascimento!: string;
  password_set!: boolean | null;
  groups!: Groups[];
  user_permissions!: Perms[];
  is_admin!: boolean;
  is_staff!: boolean;

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }

  // Método estático para retornar labels humanizadas
  static getLabels() {
    const { t } = useI18n();
    return {
      id: t('user.id'),
      first_name: t('user.first_name'),
      last_name: t('user.last_name'),
      username: t('user.username'),
      email: t('user.email'),
      cpf: t('user.cpf'),
      telefone: t('user.telefone'),
      data_nascimento: t('user.data_nascimento'),
      password_set: t('user.password_set'),
      groups: t('user.groups'),
      user_permissions: t('user.user_permissions'),
      is_admin: t('user.is_admin'),
      is_staff: t('user.is_staff'),
    };
  }
}