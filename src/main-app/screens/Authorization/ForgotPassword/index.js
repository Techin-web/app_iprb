import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { Alert, Text, View } from "react-native";
import { INSTITUTION_ID } from "../../../config/institution-metadata";
import { responsiveHeight as rh } from "../../../util/Dimensions";
import KeyboardAwareScrollView from "../../../components/KeyboardAwareScrollView";
import Input from "../../../components/Input";
import MatIcons from "react-native-vector-icons/dist/MaterialIcons";
import Button from "../../../components/Button";
import API from "../../../services/axios-instance";

import styles from "./styles";

class ForgotPassword extends Component {
    state = {
        email: "",
        loading: false,
    };

    onConfirmedEmailHandler = async () => {
        try {
            this.setState({ loading: true });

            const dataToPost = {
                email: this.state.email.toLowerCase(),
                id_instituicao: INSTITUTION_ID,
            };

            await API.post("/emailservices", dataToPost);

            Alert.alert(
                "Redefinição de senha",
                "Esse token só será válido por 15 minutos. Acesse seu e-mail para redefinição.",
                [
                    {
                        text: "Fechar",
                        onPress: () => {
                            Navigation.pop(this.props.componentId);
                        },
                    },
                ]
            );
        } catch (err) {
            this.setState({ loading: false });
            Alert.alert("Ocorreu um erro:", `${err.response.data.error}`);
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView
                customStyles={styles.KeyboardAwareScrollView}
            >
                <View style={styles.Container}>
                    <Text style={styles.ForgotTitle}>Esqueci a senha</Text>
                    <MatIcons
                        name="phonelink-lock"
                        size={rh("20%")}
                        color="#fff"
                        style={styles.Icon}
                    />
                    <Text style={styles.Paragraph}>
                        Informe o e-mail cadastrado abaixo que enviaremos um
                        link para que você possa criar uma nova senha
                    </Text>
                    <View style={styles.InputHolder}>
                        <Input
                            placeholder="E-MAIL"
                            value={this.state.email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(e) => this.setState({ email: e })}
                        />
                    </View>
                    <Button
                        title="Enviar"
                        dark
                        onPress={this.onConfirmedEmailHandler}
                        disabled={this.state.loading}
                    />
                    <Button
                        title="Voltar"
                        extremeLight
                        onPress={() => Navigation.pop(this.props.componentId)}
                        disabled={this.state.loading}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

ForgotPassword.options = {
    topBar: {
        visible: false,
    },
};

export default ForgotPassword;
