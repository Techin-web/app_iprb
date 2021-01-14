import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .required('É obrigatório preencher o nome')
    .min(3, 'Digite seu nome completo.'),
  email: yup
    .string()
    .required('É obrigatório preencher o email')
    .email('Digite um email válido'),
  phone: yup
    .string()
    .required('É obrigatório preencher o telefone')
    .min(14, 'Digite um telefone válido'),
  cpf: yup
    .string()
    .required('É obrigatório preencher o CPF')
    .min(14, 'Digite um CPF válido'),
  cep: yup
    .string()
    .required('É obrigatório preencher o CEP')
    .min(10, 'Digite um CEP válido'),
  password: yup
    .string()
    .required('É obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
