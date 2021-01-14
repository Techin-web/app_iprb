import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View, Linking } from "react-native";
import { Navigation } from "react-native-navigation";
import { Container, Content, Text, Button } from "native-base";
import { navigationName } from "../register-screens";
import { withAlertErrorComponent } from "../../components";

import styles from "./style";
import successBg1 from "../../assets/success-bg1.png";
import successBg2 from "../../assets/success-bg2.png";

const messages = {
    financialResponsible: "Responsável financeiro adicionado com sucesso.",
    holder: "Titular adicionado com sucesso.",
    dependent: "Dependente adicionado com sucesso.",
    payment_success: "Compra do plano de saúde realizada com sucesso",
    payment_bill:
        "Para finalizar a compra do plano de saúde basta pagar o boleto",
    pending_analysis:
        "Compra do plano de saúde realizada com sucesso porém está sujeito a análise da operadora. O responsável financeiro será comunicado num prazo de 24 horas para o prosseguimento.",
};

class SuccessInternalComponent extends Component {
    handleSeeBill = () => {
        const { boletoUrl = "https://docs.pagar.me" } = this.props.orderResult;
        Linking.openURL(boletoUrl)
            .then(() => {
                this.props.resetOrder();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleContinue = () => {
        const { from } = this.props;
        if (
            from === "pending_analysis" ||
            from === "payment_bill" ||
            from === "payment_success"
        ) {
            this.props.resetOrder();
            Navigation.popTo(navigationName.healthInsuranceDetail);
        } else {
            const popTop =
                from === "dependent"
                    ? navigationName.familyMemberList
                    : navigationName.quoteBuy;
            Navigation.popTo(popTop);
        }
    };

    render() {
        const { from } = this.props;
        const showImage = from !== "pending_analysis";
        const isPaymentBill = from === "payment_bill";
        const message = messages[from || "financialResponsible"];
        const title =
            from === "pending_analysis"
                ? "Finalizado com pendência!"
                : "Pronto!";

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    <View style={styles.messageContainer}>
                        {showImage && <Image source={successBg1} />}
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            <Text
                                style={
                                    showImage
                                        ? styles.message
                                        : styles.messageNoImage
                                }
                            >
                                {message}
                            </Text>
                        </View>
                        {showImage && <Image source={successBg2} />}
                    </View>
                    {isPaymentBill && (
                        <Button
                            style={styles.buttonPay}
                            full
                            bordered
                            onPress={this.handleSeeBill}
                        >
                            <Text style={styles.buttonText}>VER BOLETO</Text>
                        </Button>
                    )}
                    <Button
                        style={styles.button}
                        onPress={this.handleContinue}
                        full
                    >
                        <Text style={styles.buttonText}>CONTINUAR</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

SuccessInternalComponent.propTypes = {
    from: PropTypes.oneOf([
        "financialResponsible",
        "holder",
        "dependent",
        "payment_success",
        "payment_bill",
        "pending_analysis",
    ]),
};

const SuccessComponent = withAlertErrorComponent(SuccessInternalComponent);
export { SuccessComponent };
