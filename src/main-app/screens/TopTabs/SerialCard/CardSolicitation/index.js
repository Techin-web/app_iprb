import React, { Component } from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { Navigation } from "react-native-navigation";
import { isCPFValid } from "../../../../util/CPF-validator";
import { Formik } from "formik";
import { responsiveWidth as rw } from "../../../../util/Dimensions";
import KeyboardAwareScrollView from "../../../../components/KeyboardAwareScrollView";
import Octicons from "react-native-vector-icons/dist/Octicons";
import Input from "../../../../components/Input";
import MaskedInput from "../../../../components/MaskedInput";
import Button from "../../../../components/Button";
import LoadingScreen from "../../../../components/LoadingScreen";
import API from "../../../../services/axios-instance";

import styles from "./styles";
import formSchema from "./form-schema";

class CardSolicitation extends Component {
    state = {
        formData: {
            name: "",
            birth: "",
            cpf: "",
            email: "",
            motherName: "",
            phone: "",
        },
        loading: true,
    };

    componentDidMount = async () => {
        this.completeFormDataHandler();
        this.verifySolicitationAlreadyExists();
    };

    completeFormDataHandler = async () => {
        const { data: user } = await API.get("/users");

        const formData = { ...this.state.formData };
        formData.name = user.name || "";
        formData.birth = user.birth || "";
        formData.cpf = user.cpf || "";
        formData.email = user.email || "";
        formData.phone = user.phone || "";

        this.setState({ formData, loading: false });
    };

    verifySolicitationAlreadyExists = async () => {
        const { data: cartao } = await API.get("/solicitacaocartao/usuario");

        if (cartao) {
            const solicitationDate = new Date(
                cartao.createdAt
            ).toLocaleDateString("pt-br");

            Alert.alert(
                "Solicitação em análise.",
                `Sua solicitação foi realizada no dia ${solicitationDate}.
        Aguarde até 15 dias úteis para o recebimento do cartão. `,
                [
                    {
                        text: "Ok",
                        onPress: () => Navigation.pop(this.props.componentId),
                    },
                ]
            );
        }
    };

    onChangedFormDataHandler = (value, attribute) => {
        const formData = { ...this.state.formData };
        formData[attribute] = value;

        this.setState({ formData });
    };

    onSubmittedFormHandler = async (formValues, errors) => {
        const formData = { ...formValues };

        const firstError = Object.values(errors)[0];
        if (firstError) {
            return Alert.alert("Campos Obrigatórios.", firstError);
        }

        if (!isCPFValid(formData.cpf)) {
            return Alert.alert(
                "CPF Inválido",
                "Verifique o CPF digitado e garanta que ele seja válido."
            );
        }

        this.setState({ loading: true });

        const dataToPost = {
            nome_completo: formData.name,
            data_nascimento: formData.birth,
            cpf: formData.cpf,
            email: formData.email,
            nome_da_mae: formData.motherName,
            telefone_celular: formData.phone,
        };

        const log = [
            dataToPost.data_nascimento,
            dataToPost.cpf,
            dataToPost.email,
            dataToPost.nome_da_mae,
            dataToPost.telefone_celular,
        ].join("\n");

        Alert.alert(dataToPost.nome_completo, log, [
            {
                text: "Confirmar Dados",
                onPress: () => this.onConfirmedDataHandler(dataToPost),
            },
            {
                text: "Cancelar",
                onPress: () => this.setState({ loading: false }),
                style: "cancel",
            },
        ]);
    };

    onConfirmedDataHandler = async (dataToPost) => {
        try {
            await API.post("/solicitacaocartao", dataToPost);
            Alert.alert(
                "Uma solicitação foi encaminhada",
                "Em breve você será notificado com o status do seu pedido.",
                [
                    {
                        text: "Ok",
                        onPress: () => Navigation.pop(this.props.componentId),
                    },
                ]
            );
        } catch (err) {
            this.setState({ loading: false });
            Alert.alert("Falha ao solicitar cartão", err.response.data.error);
        }
    };

    render() {
        return this.state.loading ? (
            <LoadingScreen indicatorColor="#537AF5" />
        ) : (
            <Formik
                initialValues={{
                    ...this.state.formData,
                }}
                validationSchema={formSchema}
                initialErrors={{
                    error: "É obrigatório preencher todos os campos",
                }}
            >
                {(formikProps) => (
                    <KeyboardAwareScrollView>
                        <ScrollView style={styles.ScrollView}>
                            <View style={styles.Container}>
                                <Text style={styles.Title}>
                                    Solicite seu cartão
                                </Text>
                                <Octicons
                                    name="credit-card"
                                    size={rw("40%")}
                                    color="#537AF5"
                                />
                                <Text style={styles.Subtitle}>
                                    Preencha o formulário para solicitar seu
                                    cartão e poder usá-lo como quiser
                                </Text>
                                <Input
                                    placeholder="NOME*"
                                    dense
                                    small
                                    value={formikProps.values.name}
                                    validatePlaceholder
                                    editable={false}
                                />
                                <Input
                                    placeholder="E-MAIL*"
                                    dense
                                    small
                                    value={formikProps.values.email}
                                    validatePlaceholder
                                    editable={false}
                                />
                                <MaskedInput
                                    type="cpf"
                                    placeholder="CPF*"
                                    dense
                                    small
                                    value={formikProps.values.cpf}
                                    validatePlaceholder
                                    editable={false}
                                />
                                <MaskedInput
                                    type="cel-phone"
                                    options={{
                                        maskType: "BRL",
                                        withDDD: true,
                                        dddMask: "(99) ",
                                    }}
                                    placeholder="TELEFONE () -*"
                                    dense
                                    small
                                    value={formikProps.values.phone}
                                    validatePlaceholder
                                    onChangeText={formikProps.handleChange(
                                        "phone"
                                    )}
                                />
                                <MaskedInput
                                    type={"datetime"}
                                    options={{
                                        format: "DD/MM/YYYY",
                                    }}
                                    placeholder="DATA DE NASCIMENTO*"
                                    dense
                                    small
                                    value={formikProps.values.birth}
                                    validatePlaceholder
                                    onChangeText={formikProps.handleChange(
                                        "birth"
                                    )}
                                />
                                <Input
                                    placeholder="NOME DA MÃE*"
                                    dense
                                    small
                                    value={formikProps.values.motherName}
                                    validatePlaceholder
                                    onChangeText={formikProps.handleChange(
                                        "motherName"
                                    )}
                                />
                                <View style={styles.ButtonHolder}>
                                    <Button
                                        title="Enviar"
                                        bold
                                        dark
                                        disabled={this.state.loading}
                                        onPress={() =>
                                            this.onSubmittedFormHandler(
                                                formikProps.values,
                                                formikProps.errors
                                            )
                                        }
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        );
    }
}

CardSolicitation.options = {
    topBar: {
        title: {
            text: "Solicitação Cartão",
        },
    },
};

export default CardSolicitation;
