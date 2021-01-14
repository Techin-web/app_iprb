const formValidation = (yup) => {
    const responseShape = {
        name: yup
            .string()
            .length(16, 'Incompleto')
            .required('Obrigatório'),
        email: yup
            .string()
            .email('Informe um email válido')
            .required('Obrigatório'),
        cpf: yup
            .string()
            .length(11, 'Incompleto')
            .required('Obrigatório'),
        phone: yup
            .string()
            .min(10, 'Incompleto')
            .required('Obrigatório'),
        birth: yup
            .string()
            .min(8, 'Incompleto')
            .required('Obrigatório'),
        cep: yup
            .string()
            .min(8, 'Incompleto')
            .required('Obrigatório'),
    };
    return yup.object().shape(responseShape);
}

export default formValidation;
