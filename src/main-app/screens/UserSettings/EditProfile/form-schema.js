import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .required("É obrigatório preencher o nome")
        .min(3, "Digite seu nome completo."),
    phone: yup
        .string()
        .required("É obrigatório preencher o telefone")
        .min(14, "Digite um telefone válido"),
    cep: yup
        .string()
        .required("É obrigatório preencher o CEP")
        .min(10, "Digite um CEP válido"),
    oldPassword: yup.string().required("É necessário preencher sua senha"),
});
