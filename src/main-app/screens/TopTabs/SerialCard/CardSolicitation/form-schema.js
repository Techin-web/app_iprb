import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .required("É obrigatório preencher o nome completo")
        .min(3, "Digite seu nome completo"),
    birth: yup
        .string()
        .required("É obrigatório preencher a data de nascimento")
        .min(10, "Digite uma data válida"),
    cpf: yup
        .string()
        .required("É obrigatório preencher o cpf")
        .min(14, "Digite um CPF válido"),
    email: yup
        .string()
        .required("É obrigatório preencher o email")
        .email("Digite um email válido"),
    motherName: yup
        .string()
        .required("É obrigatório preencher o nome completo da mãe")
        .min(3, "Digite o nome completo da mãe"),
    phone: yup
        .string()
        .required("É obrigatório preencher o telefone")
        .min(14, "Digite um número de telefone válido"),
});
