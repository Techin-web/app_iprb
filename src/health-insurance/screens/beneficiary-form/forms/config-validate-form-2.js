import { postalCodeIsValid } from "../../../store/actions";

const getConfigValidateForm = (yup, typeForm) => {
    let responseShape = {
        address: yup.string().required("Obrigatório"),
        addressNumber: yup.number().required("Obrigatório"),
        occupation: yup.string(),
        neighborhood: yup.string().required("Obrigatório"),
        postalCode: yup
            .number()
            .required("Obrigatório")
            .test("cep", "CEP Inválido", async (value) => {
                if (value && value.toString().length === 8) {
                    const valid = await postalCodeIsValid(value);
                    return valid;
                }

                return false;
            }),
        cns: yup
            .string()
            .required("Obrigatório")
            .test("minCNS", "CNS Inválido", async (value) => {
                if (value && value.toString().length < 15) {
                    return false;
                }

                return true;
            })
            .test("maxCNS", "Máximo de 15 digitos", async (value) => {
                if (value && value.toString().length > 15) {
                    return false;
                }

                return true;
            }),
        state: yup.string().required("Obrigatório"),
        city: yup.string().required("Obrigatório"),
        weight: yup
            .number()
            .required("Obrigatório")
            .test("weight", "Peso Inválido", async (value) => {
                return value && value.toString().length >= 1;
            }),
        height: yup
            .number()
            .required("Obrigatório")
            .test("height", "Altura Inválida", async (value) => {
                return value && value.toString().length >= 2;
            }),
    };
    if (typeForm === "financialResponsible") {
        responseShape.email = yup
            .string()
            .email("E-mail inválido!")
            .required("Obrigatório");
        responseShape.phone = yup
            .string()
            .min(11, "Número Incompleto")
            .required("Obrigatório");
    }
    return yup.object().shape(responseShape);
};

export default getConfigValidateForm;
