import { CPF } from "cpf_cnpj";
import moment from "moment";

const getConfigValidateForm = (yup, typeForm) => {
    return yup.object().shape(getResponseShape(yup, typeForm));
};

export const getResponseShape = (yup, typeForm, isSon, isHolder) => {
    let responseShape = {
        name: yup
            .string()
            .min(3, "Mínimo 3 caracteres")
            .test("onlyLetters", "Somente Letras", (value) => {
                return /^[a-zA-Z\u00C0-\u00FF ]*$/.test(value);
            })
            .required("Obrigatório"),
        cpf: yup.string().test("cpf", "CPF Inválido", (value) => {
            return CPF.isValid(value);
        }),
        rg: yup.number().required("Obrigatório"),
        rgIssuer: yup.string().required("Obrigatório"),
        rgIssuerState: yup
            .string()
            .required("Obrigatório")
            .test("rgIssuerState", "Obrigatório", (value) => {
                return typeof value !== "undefined" && value !== "";
            }),
        motherName: yup
            .string()
            .min(3, "Mínimo 3 caracteres")
            .required("Obrigatório"),
        birthDate: yup
            .string()
            .required("Obrigatório")
            .test("date", "Data inválida", (value) => {
                const formatDate = moment(value, "DD/MM/YYYY", true);
                return formatDate.isValid() && formatDate.year() > 1900;
            })
            .test("maxDate", "Data inválida", (value) => {
                let valid = true;
                if (moment(value, "DD/MM/YYYY", true).isValid()) {
                    const days = moment().diff(
                        moment(value, "DD/MM/YYYY"),
                        "days"
                    );
                    valid = days >= 0;
                }
                return valid;
            })
            .test("minDate", "Deve ser maior de 18 anos", (value) => {
                let valid = true;
                if (
                    typeForm === "financialResponsible" &&
                    moment(value, "DD/MM/YYYY", true).isValid()
                ) {
                    const age = moment().diff(
                        moment(value, "DD/MM/YYYY"),
                        "years"
                    );
                    valid = age >= 18;
                }
                return valid;
            }),
        maritalStatus: yup
            .string()
            .required("Obrigatório")
            .test("maritalStatus", "Obrigatório", (value) => {
                return typeof value !== "undefined" && value !== "";
            }),
        gender: yup
            .string()
            .required("Obrigatório")
            .test("gender", "Obrigatório", (value) => {
                return typeof value !== "undefined" && value !== "";
            }),
    };

    if (typeForm === "dependent") {
        responseShape.familyMember = yup.string().required("Obrigatório");

        if(isSon === "1") {
            responseShape.birthDate = yup.string().required().test("maxAge", "Filho(a) com máximo de 21 anos", (value) => {
                let valid = true;

                if (
                    moment(value, "DD/MM/YYYY", true).isValid()
                ) {
                    const age = moment().diff(
                        moment(value, "DD/MM/YYYY"),
                        "years"
                    );

                    valid = age <= 21;
                }

                return valid;
            })
        }else {
            responseShape.birthDate = yup.string().required().test("maxAge", "Idade máxima de 66 anos", (value) => {
                let valid = true;

                if (
                    moment(value, "DD/MM/YYYY", true).isValid()
                ) {
                    const age = moment().diff(
                        moment(value, "DD/MM/YYYY"),
                        "years"
                    );

                    valid = age <= 66;
                }

                return valid;
            })
        }
    }

    if (typeForm === "holder") {
        responseShape.withCoparticipation = yup.bool().required("Obrigatório");

        responseShape.birthDate = yup.string().required().test("maxAge", "Idade máxima de 66 anos", (value) => {
            let valid = true;

            if (
                moment(value, "DD/MM/YYYY", true).isValid()
            ) {
                const age = moment().diff(
                    moment(value, "DD/MM/YYYY"),
                    "years"
                );

                valid = age <= 66;
            }

            return valid;
        })
    }

    if (typeForm === "financialResponsible") {
        responseShape.holder = yup.bool().required("Obrigatório");

        if(isHolder === "y") {
            responseShape.birthDate = yup.string().required().test("maxAge", "Idade máxima de 66 anos", (value) => {
                let valid = true;

                if (
                    moment(value, "DD/MM/YYYY", true).isValid()
                ) {
                    const age = moment().diff(
                        moment(value, "DD/MM/YYYY"),
                        "years"
                    );

                    valid = age <= 66;
                }

                return valid;
            })
        }

    }

    return responseShape;
};

export default getConfigValidateForm;
