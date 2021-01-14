const getConfigValidationFormCreditCard = (yup) => {
    let responseShape = {
        card_number: yup
            .string()
            .length(16, 'Incompleto')
            .required('Obrigatório'),
        cpf: yup
            .string()
            .length(11, 'Incompleto')
            .required('Obrigatório'),
        card_expiration_date: yup
            .string()
            .length(4, 'Incorreto')
            .required('Obrigatório'),
        card_cvv: yup
            .number()
            .max(999, 'Máximo 3 dígitos')
            .required('Obrigatório'),
        card_holder_name: yup
            .string()
            .required('Obrigatório'),
        zipcode: yup
            .string()
            .required('Obrigatório'),
        street: yup
            .string()
            .required('Obrigatório'),
        street_number: yup
            .string('')
            .required('Obrigatório'),
        complementary: yup
            .string(),
        state: yup
            .string()
            .required('Obrigatório'),
        neighborhood: yup
            .string()
            .required('Obrigatório')
    };
    return yup.object().shape(responseShape);
}

export default getConfigValidationFormCreditCard;
