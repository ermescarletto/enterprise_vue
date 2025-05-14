import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    user: {
      id: 'ID',
      first_name: 'First Name',
      last_name: 'Last Name',
      username: 'Username',
      email: 'Email',
      cpf: 'CPF',
      telefone: 'Phone',
      data_nascimento: 'Date of Birth',
      password_set: 'Password Set',
      groups: 'Groups',
      user_permissions: 'Permissions',
      is_admin: 'Admin',
      is_staff: 'Staff',
      // Placeholders
      first_name_placeholder: 'Enter First Name',
      last_name_placeholder: 'Enter Last Name',
      username_placeholder: 'Enter Username',
      email_placeholder: 'Enter Email',
      cpf_placeholder: 'Enter CPF',
      telefone_placeholder: 'Enter Phone',
      data_nascimento_placeholder: 'Enter Date of Birth',
      password_set_placeholder: 'Set Password',
      groups_placeholder: 'Select Groups',
      user_permissions_placeholder: 'Select Permissions',
      is_admin_placeholder: 'Is Admin?',
      is_staff_placeholder: 'Is Staff?',
    },
  },
  pt: {
    user: {
      id: 'ID',
      first_name: 'Nome',
      last_name: 'Sobrenome',
      username: 'Usuário',
      email: 'Email',
      cpf: 'CPF',
      telefone: 'Telefone',
      data_nascimento: 'Data de Nascimento',
      password_set: 'Senha Definida',
      groups: 'Grupos',
      user_permissions: 'Permissões',
      is_admin: 'Administrador',
      is_staff: 'Equipe',
      // Placeholders
      first_name_placeholder: 'Digite o Nome',
      last_name_placeholder: 'Digite o Sobrenome',
      username_placeholder: 'Digite o Usuário',
      email_placeholder: 'Digite o Email',
      cpf_placeholder: 'Digite o CPF',
      telefone_placeholder: 'Digite o Telefone',
      data_nascimento_placeholder: 'Digite a Data de Nascimento',
      password_set_placeholder: 'Defina a Senha',
      groups_placeholder: 'Selecione os Grupos',
      user_permissions_placeholder: 'Selecione as Permissões',
      is_admin_placeholder: 'É Administrador?',
      is_staff_placeholder: 'É da Equipe?',
    },
  },
};

const i18n = createI18n({
  locale: 'pt', // Idioma padrão
  fallbackLocale: 'en', // Idioma de fallback
  messages,
});

export default i18n;