import React, { useState, useEffect } from "react";
import * as yup from "yup";
import moment from "moment";
import { Formik } from "formik";
import { Navigation } from "react-native-navigation";
import { Text, Alert, Keyboard } from "react-native";
import {
    Container,
    View,
    Input,
    Form,
    Item,
    Content,
    Button,
    CheckBox,
    Left,
    Right,
    Spinner,
    List,
    ListItem,
} from "native-base";
import {
    cpfMask,
    phoneMask,
    TextDivisor,
    InputTextCustom,
} from "../../components";
import { navigationConfig } from "../register-screens";
import getConfigValidationFormCreditCard from "./config-validate-form-credit-card";

import styles from "./style";

export const PaymentComponent = (props) => {
    const { orderResult, codeConfirm = false, loading, order } = props;
    if (orderResult === null) {
        return null;
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    Navigation.mergeOptions(props.componentId, {
        topBar: {
            title: {
                text: codeConfirm ? "Forma de pagamento" : "Confirmar código",
            },
        },
    });

    const { financialResponsible, holder, members, value } = orderResult;

    const [checkedCreditCard, setCheckedCreditCard] = useState(true);
    const [smsToken, setSmsToken] = useState(props.smsToken || "");

    const onChecked = (check) => {
        setCheckedCreditCard(check);
    };

    const errorSmsToken = () => {
        Alert.alert("Token inválido");
    };

    const resendSMS = () => {
        let {
            holder = {},
            financialResponsible = {},
            familyMembers = [],
        } = props.order;
        props
            .saveOrder({
                holder,
                financialResponsible,
                familyMembers,
                healthInsuranceId: props.healthInsurance.id,
            })
            .then((data) => {
                Alert.alert("SMS reenviado!");
            });
    };

    const preparePaymentInfo = (form = {}) => {
        const { orderResult } = props;
        const { id } = orderResult;
        const {
            card_number,
            card_cvv,
            card_expiration_date,
            card_holder_name,
            city,
            neighborhood,
            state,
            street,
            street_number,
            zipcode,
            cpf,
        } = form;

        let billing = {
            name: card_holder_name,
            address: {
                country: "br",
                state,
                city,
                neighborhood,
                street,
                street_number,
                zipcode,
            },
        };

        let cardInfo = {
            card_number,
            card_cvv,
            card_expiration_date,
            card_holder_name,
            customer: {
                external_id: `#${financialResponsible.id}`,
                name: card_holder_name,
                type: "individual",
                country: "br",
                email: financialResponsible.email,
                documents: [
                    {
                        type: "cpf",
                        number: cpf,
                    },
                ],
                phone_numbers: [`+55${financialResponsible.phone}`],
                birthday: moment(financialResponsible.birthDate).format(
                    "YYYY-MM-DD"
                ),
            },
            billing,
        };

        let result = {
            id,
            financialResponsibleId: financialResponsible.id,
            typePayment: checkedCreditCard ? "cartao" : "boleto",
            smsToken,
        };

        if (checkedCreditCard) {
            result.cardInfo = cardInfo;
        }

        props.saveFinishOrder(result).then((data) => {
            if (data) {
                if (data.orderStatus === "pending_analysis") {
                    // props.resetOrder();
                    Navigation.push(props.componentId, {
                        component: {
                            ...navigationConfig.success,
                            passProps: {
                                from: "pending_analysis",
                            },
                        },
                    });
                } else {
                    Navigation.push(props.componentId, {
                        component: {
                            ...navigationConfig.success,
                            passProps: {
                                from: checkedCreditCard
                                    ? "payment_success"
                                    : "payment_bill",
                            },
                        },
                    });
                }
            }
        });
    };

    const formatMoney = (value) => {
        return value;
    };

    const renderInfoBeneficiary = (beneficiary = {}, title) => {
        const { name, cpf, phone, email, healthInsuranceValue } = beneficiary;
        return (
            <View style={styles.viewInformation}>
                <Text style={[styles.textBlue, styles.title]}> {title} </Text>
                <Text style={[styles.textBlue, styles.text]}> {name} </Text>
                <Text style={[styles.textBlue, styles.text]}>
                    {" "}
                    CPF: {cpfMask(cpf || "")}{" "}
                </Text>
                {title === "Responsável Financeiro:" && (
                    <Text style={[styles.textBlue, styles.text]}>
                        {" "}
                        Telefone: {phoneMask(phone || "")}{" "}
                    </Text>
                )}
                <Item style={styles.noBorderBottom}>
                    <Left>
                        {title === "Responsável Financeiro:" && (
                            <Text style={[styles.textBlue, styles.text]}>
                                Email: {email}
                            </Text>
                        )}
                    </Left>
                    {healthInsuranceValue &&
                        title !== "Responsável Financeiro:" && (
                            <Right>
                                <Text style={[styles.textBlue, styles.text]}>
                                    Valor: {formatMoney(healthInsuranceValue)}
                                </Text>
                            </Right>
                        )}
                </Item>
            </View>
        );
    };

    const renderInfoDependents = (dependents = []) => {
        if (!dependents.length) return null;
        return (
            <View style={styles.viewInformation}>
                <Text style={[styles.textBlue, styles.title]}>
                    {" "}
                    Dependentes:{" "}
                </Text>
                {dependents.map((dependent, index) => (
                    <View style={{ marginBottom: 5, marginTop: 5 }} key={index}>
                        <Text
                            style={[styles.textBlue, styles.text]}
                            key={index}
                        >
                            {`${index + 1}. ${dependent.name}`}
                        </Text>
                        <Item style={styles.noBorderBottom}>
                            <Left>
                                <Text style={[styles.textBlue, styles.text]}>
                                    CPF: {cpfMask(dependent.cpf || "")}
                                </Text>
                            </Left>
                            {dependent.healthInsuranceValue && (
                                <Right>
                                    <Text
                                        style={[styles.textBlue, styles.text]}
                                    >
                                        Valor:{" "}
                                        {formatMoney(
                                            dependent.healthInsuranceValue
                                        )}
                                    </Text>
                                </Right>
                            )}
                        </Item>
                    </View>
                ))}
            </View>
        );
    };

    const renderCodeConfirm = () => {
        return (
            <View style={styles.viewCode}>
                <Text style={[styles.textBlue, styles.title]}>
                    Informe o código enviado por SMS
                </Text>
                <Form>
                    <Item style={[styles.noBorderBottom, styles.inputItem]}>
                        <Input
                            style={styles.input}
                            placeholder="000000"
                            placeholderTextColor="#4055B3"
                            keyboardType="number-pad"
                            onChangeText={setSmsToken}
                        />
                    </Item>
                </Form>
                <Button
                    full
                    transparent
                    style={[
                        styles.footerButtonPayment,
                        styles.footerButtonResend,
                    ]}
                    onPress={() => {
                        resendSMS();
                    }}
                >
                    <Text style={[styles.textResend]}>Reenviar SMS</Text>
                </Button>
            </View>
        );
    };

    const renderPaymentCreditCard = () => {
        return (
            <Formik
                initialValues={{}}
                validationSchema={getConfigValidationFormCreditCard(yup)}
            >
                {({
                    values,
                    handleSubmit,
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

                    const invalidForm =
                        !isValid || Object.keys(values).length === 0;

                    return (
                        <>
                            <View style={{ marginBottom: 30 }}>
                                <List>
                                    <ListItem
                                        itemHeader
                                        style={styles.marginLeft}
                                    >
                                        <Text
                                            style={[
                                                styles.textBlue,
                                                styles.title,
                                            ]}
                                        >
                                            Dados do cartão
                                        </Text>
                                    </ListItem>

                                    <InputTextCustom
                                        label="Número do cartão*"
                                        name="card_number"
                                        placeholder="0000 0000 0000 0000"
                                        keyboardType="number-pad"
                                        {...methods}
                                    />

                                    <Item style={styles.noBorder}>
                                        <InputTextCustom
                                            label="Data de expiração*"
                                            name="card_expiration_date"
                                            placeholder="00/00"
                                            keyboardType="number-pad"
                                            selectMiddle={true}
                                            {...methods}
                                        />

                                        <InputTextCustom
                                            label="Código de segurança*"
                                            name="card_cvv"
                                            placeholder="000"
                                            keyboardType="number-pad"
                                            selectMiddle={true}
                                            {...methods}
                                        />
                                    </Item>

                                    <InputTextCustom
                                        label="Nome impresso no cartão*"
                                        name="card_holder_name"
                                        placeholder="Qual o nome impresso no seu cartão?"
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="CPF*"
                                        name="cpf"
                                        placeholder="000.000.000-00"
                                        keyboardType="number-pad"
                                        {...methods}
                                    />

                                    <ListItem
                                        itemHeader
                                        style={styles.marginLeft}
                                    >
                                        <Text
                                            style={[
                                                styles.textBlue,
                                                styles.title,
                                            ]}
                                        >
                                            Endereço de cobrança
                                        </Text>
                                    </ListItem>

                                    <InputTextCustom
                                        label="CEP*"
                                        name="zipcode"
                                        placeholder="00000-000"
                                        keyboardType="number-pad"
                                        handleBlur={fetchAddressByPostalCode}
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="Endereço*"
                                        name="street"
                                        placeholder="Endereço"
                                        autocompleteValue={getAutoCompleteValue(
                                            "street"
                                        )}
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="Número*"
                                        name="street_number"
                                        keyboardType="number-pad"
                                        placeholder="Número"
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="Complemento*"
                                        name="complementary"
                                        placeholder="Complemento"
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="Estado*"
                                        name="state"
                                        placeholder="Estado"
                                        autocompleteValue={getAutoCompleteValue(
                                            "state"
                                        )}
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="Cidade*"
                                        name="city"
                                        placeholder="Cidade"
                                        autocompleteValue={getAutoCompleteValue(
                                            "city"
                                        )}
                                        {...methods}
                                    />

                                    <InputTextCustom
                                        label="Bairro*"
                                        name="neighborhood"
                                        placeholder="Bairro"
                                        autocompleteValue={getAutoCompleteValue(
                                            "neighborhood"
                                        )}
                                        {...methods}
                                    />
                                </List>
                            </View>
                            <Button
                                full
                                rounded
                                style={[
                                    styles.footerButtonPayment,
                                    invalidForm && styles.buttonDisabled,
                                ]}
                                disabled={invalidForm}
                                onPress={() => {
                                    preparePaymentInfo(values);
                                }}
                            >
                                <Text style={styles.textButton}>ENVIAR</Text>
                            </Button>
                        </>
                    );
                }}
            </Formik>
        );
    };

    const getAutoCompleteValue = (field) => {
        if (!props.postalCodeAutoComplete) {
            return null;
        }

        return props.postalCodeAutoComplete[field];
    };

    const fetchAddressByPostalCode = (postalCode) => {
        if (postalCode && postalCode.length === 8) {
            props.fetchAddressByPostalCode(postalCode);
        }
    };

    const renderPaymentBill = () => {
        return (
            <Button
                full
                rounded
                style={styles.footerButtonPayment}
                onPress={() => {
                    preparePaymentInfo({});
                }}
            >
                <Text style={styles.textButton}>ENVIAR</Text>
            </Button>
        );
    };

    const renderPayment = (onChecked, checkedCreditCard) => {
        return (
            <>
                <Text
                    style={[
                        styles.textBlue,
                        styles.title,
                        styles.titleMarginTop,
                    ]}
                >
                    Selecione a forma de pagamento
                </Text>
                <View style={[styles.row, styles.checkBoxOption]}>
                    <CheckBox
                        checked={checkedCreditCard}
                        color={"#5A74EB"}
                        onPress={() => {
                            onChecked(true);
                        }}
                    />
                    <Text
                        button
                        style={styles.itemAnswerText}
                        onPress={() => {
                            onChecked(true);
                        }}
                    >
                        Cartão de Crédito
                    </Text>
                </View>
                <View style={[styles.row, styles.checkBoxOption]}>
                    <CheckBox
                        checked={!checkedCreditCard}
                        color={"#5A74EB"}
                        onPress={() => {
                            onChecked(false);
                        }}
                    />
                    <Text
                        button
                        style={styles.itemAnswerText}
                        onPress={() => {
                            onChecked(false);
                        }}
                    >
                        Boleto
                    </Text>
                </View>
                {checkedCreditCard && renderPaymentCreditCard()}
            </>
        );
    };

    let styleContainer = isKeyboardVisible ? {} : styles.contentContainer;

    return (
        <Container style={styles.container}>
            <Content contentContainerStyle={codeConfirm ? {} : styleContainer}>
                {loading && (
                    <Spinner
                        color={styles.primaryColor.color}
                        style={styles.loading}
                    />
                )}

                {!loading && (
                    <>
                        <View style={{ marginBottom: 30 }}>
                            {renderInfoBeneficiary(
                                financialResponsible,
                                "Responsável Financeiro:"
                            )}
                            {renderInfoBeneficiary(holder, "Títular do Plano:")}
                            {renderInfoDependents(members)}

                            <Text style={[styles.textBlue, styles.title]}>
                                Total do contrato: {formatMoney(value)}
                            </Text>

                            {!codeConfirm && (
                                <View style={styles.marginTextDivisor}>
                                    <TextDivisor
                                        text={
                                            "Enviamos um código de confirmação para o celular do cliente, informe-nos abaixo para finalizar a compra."
                                        }
                                    />
                                </View>
                            )}

                            {codeConfirm
                                ? renderPayment(onChecked, checkedCreditCard)
                                : renderCodeConfirm()}
                        </View>
                        {!checkedCreditCard && renderPaymentBill()}
                        {!codeConfirm && (
                            <Button
                                full
                                rounded
                                disabled={smsToken.length !== 6}
                                style={[
                                    styles.footerButtonPayment,
                                    smsToken.length !== 6 &&
                                        styles.buttonDisabled,
                                ]}
                                onPress={() => {
                                    props
                                        .checkSmsToken(
                                            orderResult.financialResponsible.id,
                                            smsToken
                                        )
                                        .then((data) => {
                                            if (data.success) {
                                                if (
                                                    props.orderResult
                                                        .pendingAnalysis
                                                ) {
                                                    preparePaymentInfo();
                                                } else {
                                                    Navigation.push(
                                                        props.componentId,
                                                        {
                                                            component: {
                                                                ...navigationConfig.payment,
                                                                passProps: {
                                                                    codeConfirm: true,
                                                                    smsToken: smsToken,
                                                                },
                                                            },
                                                        }
                                                    );
                                                }
                                            } else {
                                                errorSmsToken();
                                            }
                                        })
                                        .catch((e) => {
                                            errorSmsToken();
                                        });
                                }}
                            >
                                <Text style={styles.textButton}>ENVIAR</Text>
                            </Button>
                        )}
                    </>
                )}
            </Content>
        </Container>
    );
};
