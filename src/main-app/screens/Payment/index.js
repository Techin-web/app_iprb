import React, { useState, useEffect } from "react";
import * as yup from "yup";
import moment from "moment";
import { Formik } from "formik";
import { Navigation } from "react-native-navigation";
import { Text, Alert, Keyboard, ScrollView } from "react-native";
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
} from "../../../health-insurance/components";
import { navigationName } from "../../routes";
import getConfigValidationFormCreditCard from "./config-validate-form-credit-card";

import api from "../../services/axios-instance";

import styles from "../../../health-insurance/screens/payment/style";
import { from } from "form-data";

const PaymentComponent = ({user, plan, ...props}) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [checkedCreditCard, setCheckedCreditCard] = useState(true);
    const [smsConfirm, setSMSConfirm] = useState("");
    const [smsToken, setSmsToken] = useState("");
    const [codeConfirm, setCodeConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

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


    useEffect(() => {
        const sendSMS = async () => {
            setLoading(true);

            try {
                const response = await api.post("/sendSMS", {
                    phone: user.phone,
                    healthInsuranceId: plan.healthInsuranceId,
                });

                setSmsToken(response.data.token);
            } catch (err) {
                console.log("Error: ", err);

                Alert.alert("Aviso", "Token não enviado!", [{ text: "OK" }]);
            }

            setLoading(false);
        };

        sendSMS();
    }, []);

    const onChecked = (check) => {
        setCheckedCreditCard(check);
    };

    const errorSmsToken = () => {
        Alert.alert("Aviso", "Token inválido!", [{ text: "OK" }]);
    };

    // VISTORIADA
    const resendSMS = async () => {
        setLoading(true);

        try {
            const response = await api.post("/sendSMS", {
                phone: user.phone,
                healthInsuranceId: plan.healthInsuranceId
            });

            setSmsToken(response.data.token);

            Alert.alert("Token reenviado");
        } catch (err) {
            console.log("Error: ", err);

            Alert.alert("Aviso", "Token não enviado!", [{ text: "OK" }]);
        }

        setLoading(false);
    };

    // VISTORIADO
    const formatMoney = (value) => {
        return `R$ ${value}`;
    };

    // VISTORIADA
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
                            onChangeText={(event) => setSMSConfirm(event)}
                        />
                    </Item>
                </Form>
                <View style={{ marginTop: 10 }} />
                <Button
                    full
                    rounded
                    style={styles.footerButtonPayment}
                    onPress={() => checkSmsToken()}
                >
                    <Text style={styles.textButton}>ENVIAR</Text>
                </Button>
                <Button
                    // full
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

    const createSale = async(productId) => {
        try {
            const generateBoleto = await api.post('/recorrencia/boleto', {
                name: financialResponsible.name,
                email: financialResponsible.email,
                cpf: financialResponsible.cpf.replace('.', '').replace('.', '').replace('-', ''),
                cep: financialResponsible.cep.replace('-', '').substring(0, 8),
                dd: financialResponsible.phone.substring(1, 3),
                phone: financialResponsible.phone.substring(5).replace('-', ''),
                plan_id,
            });

            const identifier = generateBoleto.data.id;

            await api.post('/venda', {
                productId,
                clientName: financialResponsible.name,
                identifier,
            });
        }catch(err) {
            console.log('Erro: ', err);

            Alert.alert("Aviso", "Não foi possível criar a venda!", [
                { text: "OK" },
            ]);
        }
    }

    const preparePaymentInfo = (form = {}) => {
        Navigation.push(props.componentId, {
            component: {
                name: navigationName.paymentSuccessScreen,
                passProps: {
                    boletoUrl: 'https://google.com',
                    componentId: props.componentId,
                }
            },
        });

        // Navigation.push('Component6', {
        //     component: {
        //         name: navigationName.seccessScreen,
        //     },
        // });

        // createSale(5);

        return;

        // const { orderResult } = props;
        // const { id } = orderResult;
        // const {
        //     card_number,
        //     card_cvv,
        //     card_expiration_date,
        //     card_holder_name,
        //     city,
        //     neighborhood,
        //     state,
        //     street,
        //     street_number,
        //     zipcode,
        //     cpf,
        // } = form;

        // let billing = {
        //     name: card_holder_name,
        //     address: {
        //         country: "br",
        //         state,
        //         city,
        //         neighborhood,
        //         street,
        //         street_number,
        //         zipcode,
        //     },
        // };

        // let cardInfo = {
        //     card_number,
        //     card_cvv,
        //     card_expiration_date,
        //     card_holder_name,
        //     customer: {
        //         external_id: `#${financialResponsible.id}`,
        //         name: card_holder_name,
        //         type: "individual",
        //         country: "br",
        //         email: financialResponsible.email,
        //         documents: [
        //             {
        //                 type: "cpf",
        //                 number: cpf,
        //             },
        //         ],
        //         phone_numbers: [`+55${financialResponsible.phone}`],
        //         birthday: moment(financialResponsible.birthDate).format(
        //             "YYYY-MM-DD"
        //         ),
        //     },
        //     billing,
        // };

        // let result = {
        //     id,
        //     financialResponsibleId: financialResponsible.id,
        //     typePayment: checkedCreditCard ? "cartao" : "boleto",
        //     smsToken,
        // };

        // if (checkedCreditCard) {
        //     result.cardInfo = cardInfo;
        // }

        // props.saveFinishOrder(result).then((data) => {
        //     if (data) {
        //         if (data.orderStatus === "pending_analysis") {
        //             // props.resetOrder();
        //             Navigation.push(props.componentId, {
        //                 component: {
        //                     ...navigationConfig.success,
        //                     passProps: {
        //                         from: "pending_analysis",
        //                     },
        //                 },
        //             });
        //         } else {
        //             Navigation.push(props.componentId, {
        //                 component: {
        //                     ...navigationConfig.success,
        //                     passProps: {
        //                         from: checkedCreditCard
        //                             ? "payment_success"
        //                             : "payment_bill",
        //                     },
        //                 },
        //             });
        //         }
        //     }
        // });



        // VALIDATION FORM
        // if (
        //     (card_number === "" ||
        //         card_cvv === "" ||
        //         card_expiration_date === "" ||
        //         card_holder_name === "" ||
        //         cpf === "") &&
        //     checkedCreditCard
        // ) {
        //     Alert.alert("Aviso", "Informe todos os dados do cartão!", [
        //         { text: "OK" },
        //     ]);
        // }
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

                                    {/* <ListItem
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
                                    </ListItem> */}

                                    {/* <InputTextCustom
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
                                    /> */}
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

    // const getAutoCompleteValue = (field) => {
    //     if (!props.postalCodeAutoComplete) {
    //         return null;
    //     }

    //     return props.postalCodeAutoComplete[field];
    // };

    // const fetchAddressByPostalCode = (postalCode) => {
    //     if (postalCode && postalCode.length === 8) {
    //         props.fetchAddressByPostalCode(postalCode);
    //     }
    // };

    // VISTORIADA
    const renderInfo = (user = {}, title) => {
        return (
            <View style={styles.viewInformation}>
                <Text style={[styles.textBlue, styles.title]}> {title} </Text>
                <Text style={[styles.textBlue, styles.text]}> {user.name} </Text>
                <Text style={[styles.textBlue, styles.text]}>
                    CPF: {user.cpf || ""}
                </Text>
                {title === "Responsável Financeiro:" && (
                    <Text style={[styles.textBlue, styles.text]}>
                        Telefone: {user.phone || ""}
                    </Text>
                )}
                <Item style={styles.noBorderBottom}>
                    <Left>
                        {title === "Responsável Financeiro:" && (
                            <Text style={[styles.textBlue, styles.text]}>
                                Email: {user.email}
                            </Text>
                        )}
                    </Left>
                    {user.healthInsuranceValue &&
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

    // VISTORIADA
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

    // VISTORIADA
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

    // VISTORIADA
    const checkSmsToken = () => {
        if (smsConfirm === smsToken) {
            setCodeConfirm(true);

            return;
        }

        errorSmsToken();
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: 30 }}>
                            {renderInfo(
                                user,
                                "Responsável Financeiro:"
                            )}
                            {renderInfo(
                                user,
                                "Títular do Plano:"
                            )}

                            <Text style={[styles.textBlue, styles.title]}>
                                Total do contrato: {formatMoney(10)}
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
                    </ScrollView>
                )}
            </Content>
        </Container>
    );
};

export default PaymentComponent;
