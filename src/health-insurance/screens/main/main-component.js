import React from "react";
import { TextDivisor, withAlertErrorComponent } from "../../components";
import { Navigation } from "react-native-navigation";
import { navigationConfig } from "../register-screens";
import { Image, Text } from "react-native";
import { Container, Content, Button } from "native-base";
import styles from "./style";

import aidKit from "../../assets/first-aid-kit.png";

class MainScreen extends React.Component {
    componentDidMount() {
        this.props.login();
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <TextDivisor text="Aqui você encontra nossos parceiros com produtos de baixo custo, para que você possa fazer uma renda extra." />
                    <Button
                        full
                        style={styles.button}
                        onPress={() =>
                            Navigation.push(this.props.componentId, {
                                component: navigationConfig.healthInsuranceList,
                            })
                        }
                    >
                        <Image source={aidKit} style={styles.image} />
                        <Text style={styles.text}>PLANO DE SAÚDE</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const MainScreenComponent = withAlertErrorComponent(MainScreen);
export { MainScreenComponent };
