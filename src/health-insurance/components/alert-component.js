import React, { Component } from "react";
import { Alert } from "react-native";

const MESSAGES = {
    "Network Error": "Falha na conexão, reinicie o aplicativo!",
    "Network request failed": "Falha na conexão",
};

export class AlertComponent extends Component {
    componentDidUpdate() {
        if (this.props.error) {
            this.showAlert();
        }
    }

    showAlert() {
        let error = this.props.error;
        let message = error.message || this.props.error.toString();
        message = MESSAGES[message] || message;

        if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message
        ) {
            message = error.response.data.error.message;
        }

        Alert.alert("Atenção", message, [{ text: "OK" }], { cancelable: true });
    }

    render() {
        return null;
    }
}

export const withAlertErrorComponent = (WrapperComponent) => {
    return class extends Component {
        render() {
            return (
                <>
                    <WrapperComponent {...this.props} />
                    <AlertComponent {...this.props} />
                </>
            );
        }
    };
};
