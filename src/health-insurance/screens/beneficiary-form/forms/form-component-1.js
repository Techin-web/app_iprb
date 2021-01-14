import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import {
    Item,
    Label,
    ListItem,
    Text,
    Button,
    Content,
    CheckBox,
} from "native-base";
import { navigationConfig } from "../../register-screens";

import { TextDivisor } from "../../../components/text-divisor-component";
import { InputTextCustom } from "../../../components/input-text-custom-component";
import { getResponseShape } from "./config-validate-form-1";
import styles from "../style";

const maritalStatusDataOptions = [
    { label: "Selecionar", value: "" },
    { label: "Solteiro", value: "1" },
    { label: "Casado", value: "2" },
    { label: "Divorciado", value: "3" },
    { label: "Viúvo", value: "4" },
    { label: "Outro", value: "5" },
];

const genderDataOptions = [
    { label: "Selecionar", value: "" },
    { label: "Masculino", value: "m" },
    { label: "Feminino", value: "f" },
];

const familyMemberDataOptions = [
    { label: "Selecionar", value: "" },
    { label: "Filho(a)", value: "1" },
    { label: "Cônjugue", value: "2" },
];

export const FormComponent1 = (props) => {
    const [isSon, setIsSon] = useState('');
    const [isHolder, setIsHolder] = useState('');

    let initialValues = props.order[props.typeForm] || {};
    const responseShape = getResponseShape(yup, props.typeForm, isSon, isHolder);
    const [coparticipationValidation, setCoparticipationValidation] = useState(
        false
    );

    if (
        props.typeForm === "financialResponsible" &&
        coparticipationValidation
    ) {
        responseShape.withCoparticipation = yup.bool().required("Obrigatório");
    }

    const validationSchema = yup.object().shape(responseShape);

    const validate = (values, invalidForm, setFieldTouched) => {
        if (!invalidForm) {
            props.updateHolder(values, props.typeForm);
            Navigation.push(props.componentId, {
                component: {
                    ...navigationConfig[props.nextPage],
                    passProps: {
                        step: "step2",
                        typeForm: props.typeForm,
                    },
                },
            });
        } else {
            Object.keys(validationSchema.fields).forEach((name) => {
                console.log(name);
                setFieldTouched(name);
            });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values,
                handleChange,
                setFieldTouched,
                setFieldValue,
                errors,
                touched,
                isValid,
            }) => {
                const methods = {
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldTouched,
                    setFieldValue,
                };

                const hasAnswerHolder = typeof values.holder !== undefined;
                const hasAnswerWithCoparticipation =
                    typeof values.withCoparticipation !== undefined;

                const [holderCheckedYes, setHolderCheckedYes] = useState(
                    hasAnswerHolder ? values.holder === true : true
                );
                const [holderCheckedNo, setHolderCheckedNo] = useState(
                    hasAnswerHolder && values.holder === false ? true : false
                );
                const [holderCheckeValidate, setHolderCheckValidate] = useState(
                    hasAnswerHolder
                );

                const [
                    withCoparticipationCheckedYes,
                    setWithCoparticipationCheckedYes,
                ] = useState(
                    hasAnswerWithCoparticipation
                        ? values.withCoparticipation === true
                        : true
                );
                const [
                    withCoparticipationCheckedNo,
                    setWithCoparticipationCheckedNo,
                ] = useState(
                    hasAnswerWithCoparticipation &&
                        values.withCoparticipation === false
                        ? true
                        : false
                );
                const [
                    withCoparticipationCheckValidate,
                    setWithCoparticipationCheckValidate,
                ] = useState(initialValues.withCoparticipation);

                const invalidForm =
                    !isValid ||
                    Object.keys(values).length === 0 ||
                    (props.typeForm === "holder" &&
                        typeof withCoparticipationCheckValidate ===
                            "undefined") ||
                    (props.typeForm === "financialResponsible" &&
                        (typeof holderCheckeValidate === "undefined" ||
                            (holderCheckedYes &&
                                typeof withCoparticipationCheckValidate ===
                                    "undefined")));

                const holderOnChecked = (id) => {
                    setIsHolder(id);
                    setHolderCheckValidate(true);
                    if (id === "y") {
                        setHolderCheckedNo(false);
                        setHolderCheckedYes(true);
                        setCoparticipationValidation(true);
                        // checkDateBirth();
                    } else {
                        setHolderCheckedYes(false);
                        setHolderCheckedNo(true);
                        setCoparticipationValidation(false);
                    }
                };

                const withCoparticipationOnChecked = (id) => {
                    setWithCoparticipationCheckValidate(true);
                    if (id === "y") {
                        setWithCoparticipationCheckedNo(false);
                        setWithCoparticipationCheckedYes(true);
                    } else {
                        setWithCoparticipationCheckedYes(false);
                        setWithCoparticipationCheckedNo(true);
                    }
                };

                return (
                    <Content>
                        <TextDivisor text={props.textTop} />
                        {props.typeForm === "financialResponsible" && (
                            <View style={styles.containerOptions}>
                                <Item style={styles.checkbokItemLabel}>
                                    <Text style={styles.textBlue}>
                                        Você é o títular desse plano de saúde?
                                        {touched["holder"] &&
                                            errors["holder"] && (
                                                <Text style={styles.formError}>
                                                    {errors["holder"]}
                                                </Text>
                                            )}
                                    </Text>
                                </Item>
                                <ListItem style={styles.contentEvenly}>
                                    <TouchableOpacity
                                        style={styles.row}
                                        onPress={() => {
                                            values.holder = true;
                                            holderOnChecked("y");
                                        }}
                                    >
                                        <CheckBox
                                            color="#5A74EB"
                                            style={styles.checkbox}
                                            checked={holderCheckedYes}
                                            onPress={() => {
                                                values.holder = true;
                                                holderOnChecked("y");
                                            }}
                                        />
                                        <Label style={styles.textBlue}>
                                            Sim
                                        </Label>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.row}
                                        onPress={() => {
                                            values.holder = false;
                                            holderOnChecked("n");
                                        }}
                                    >
                                        <CheckBox
                                            color="#5A74EB"
                                            style={styles.checkbox}
                                            checked={holderCheckedNo}
                                            onPress={() => {
                                                values.holder = false;
                                                holderOnChecked("n");
                                            }}
                                        />
                                        <Label style={styles.textBlue}>
                                            Não
                                        </Label>
                                    </TouchableOpacity>
                                </ListItem>
                            </View>
                        )}
                        {(values.holder || props.typeForm === "holder") && (
                            <View style={styles.containerOptions}>
                                <Item style={styles.checkbokItemLabel}>
                                    <Text style={styles.textBlue}>
                                        O seu plano é:
                                        {holderCheckeValidate &&
                                            touched["withCoparticipation"] &&
                                            errors["withCoparticipation"] && (
                                                <Text style={styles.formError}>
                                                    {
                                                        errors[
                                                            "withCoparticipation"
                                                        ]
                                                    }
                                                </Text>
                                            )}
                                    </Text>
                                </Item>
                                <View style={styles.chooseInsuranceContainer}>
                                    <TouchableOpacity
                                        style={styles.chooseInsuranceItem}
                                        onPress={() => {
                                            values.withCoparticipation = true;
                                            withCoparticipationOnChecked("y");
                                        }}
                                    >
                                        <CheckBox
                                            color="#5A74EB"
                                            style={styles.checkbox}
                                            checked={
                                                withCoparticipationCheckedYes
                                            }
                                            onPress={() => {
                                                values.withCoparticipation = true;
                                                withCoparticipationOnChecked(
                                                    "y"
                                                );
                                            }}
                                        />
                                        <Label style={styles.textBlue}>
                                            Com copartipação
                                        </Label>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.chooseInsuranceItem}
                                        onPress={() => {
                                            values.withCoparticipation = false;
                                            withCoparticipationOnChecked("n");
                                        }}
                                    >
                                        <CheckBox
                                            color="#5A74EB"
                                            style={styles.checkbox}
                                            checked={
                                                withCoparticipationCheckedNo
                                            }
                                            onPress={() => {
                                                values.withCoparticipation = false;
                                                withCoparticipationOnChecked(
                                                    "n"
                                                );
                                            }}
                                        />
                                        <Label style={styles.textBlue}>
                                            Sem coparticipação
                                        </Label>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {props.typeForm === "dependent" && (
                            <InputTextCustom
                                label="Grau de parentesco*"
                                name="familyMember"
                                placeholder="Grau de parentesco"
                                typeInput="select"
                                dataOptions={familyMemberDataOptions}
                                setIsSon={setIsSon}
                                {...methods}
                            />
                        )}

                        <InputTextCustom
                            label="Nome*"
                            name="name"
                            placeholder="Qual o seu nome?"
                            {...methods}
                        />

                        <InputTextCustom
                            label="CPF*"
                            name="cpf"
                            placeholder="Qual o seu CPF?"
                            keyboardType="number-pad"
                            {...methods}
                        />

                        <InputTextCustom
                            label="RG*"
                            name="rg"
                            placeholder="Qual o seu RG?"
                            keyboardType="number-pad"
                            {...methods}
                        />
                        <Item style={styles.noBorder}>
                            <InputTextCustom
                                label="Órgão emissor*"
                                name="rgIssuer"
                                {...methods}
                            />

                            <InputTextCustom
                                label="UF*"
                                name="rgIssuerState"
                                typeInput="select"
                                dataOptions={props.states}
                                selectMiddle={true}
                                setIsSon={setIsSon}
                                {...methods}
                            />
                        </Item>

                        <InputTextCustom
                            label="Nome da mãe*"
                            name="motherName"
                            {...methods}
                        />

                        <InputTextCustom
                            label="Data de nascimento*"
                            name="birthDate"
                            placeholder="00/00/0000"
                            typeInput="text"
                            keyboardType="number-pad"
                            {...methods}
                        />

                        <Item style={styles.noBorder}>
                            <InputTextCustom
                                label="Estado civil*"
                                name="maritalStatus"
                                typeInput="select"
                                selectMiddle={true}
                                dataOptions={maritalStatusDataOptions}
                                setIsSon={setIsSon}
                                {...methods}
                            />

                            <InputTextCustom
                                label="Gênero*"
                                name="gender"
                                placeholder="Gênero"
                                typeInput="select"
                                selectMiddle={true}
                                dataOptions={genderDataOptions}
                                setIsSon={setIsSon}
                                {...methods}
                            />
                        </Item>

                        <Button
                            rounded
                            full
                            style={styles.footerButtonForm}
                            onPress={() => {
                                validate(values, invalidForm, setFieldTouched);
                            }}
                        >
                            <Text>PRÓXIMO</Text>
                        </Button>
                    </Content>
                );
            }}
        </Formik>
    );
};
