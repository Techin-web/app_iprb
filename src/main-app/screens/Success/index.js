import React, { useState } from "react";
import { Image, View, Linking } from "react-native";
import { Navigation } from "react-native-navigation";
import { Container, Content, Text, Button } from "native-base";
import { navigationName } from "../../routes";

import styles from "./style";
import successBg1 from "../../../health-insurance/assets/success-bg1.png";
import successBg2 from "../../../health-insurance/assets/success-bg2.png";

const messages = {
    payment_success: "Compra realizada com sucesso, mais informações serão enviadas por email",
    payment_boleto:
        "Finalize a compra pagando o boleto enviado para o email do comprador",
};

const Success = ({ boletoUrl, ...props }) => {
    const [showImage, setShowImage] = useState(false);
    const handleSeeBill = () => {
        const boleto = boletoUrl || "https://docs.pagar.me";

        Linking.openURL(boleto);
    };

    const handleClose = () => {
        Navigation.push(props.componentId, {
            component: {
                name: navigationName.topTabs,
            },
        });
    };

    return (
        <Container style={styles.container}>
            <Content contentContainerStyle={styles.content}>
                <View style={styles.messageContainer}>
                    {!showImage && <Image source={successBg1} />}
                    <View style={{ paddingVertical: 32 }}>
                        <Text style={styles.title}>{boletoUrl ? messages.payment_boleto : messages.payment_success}</Text>
                    </View>
                    {!showImage && <Image source={successBg2} />}
                </View>
                {boletoUrl &&
                    <Button
                        style={styles.buttonPay}
                        full
                        bordered
                        onPress={() => handleSeeBill()}
                    >
                        <Text style={styles.buttonText}>VER BOLETO</Text>
                    </Button>
                }
                <Button
                    style={styles.button}
                    onPress={() => handleClose()}
                    full
                >
                    <Text style={styles.buttonText}>FECHAR</Text>
                </Button>
            </Content>
        </Container>
    )
}

Success.options = {
    topBar: {
        visible: false,
    },
};

export default Success;
