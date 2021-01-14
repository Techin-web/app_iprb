import React, { Component } from "react";
import Pdf from "react-native-pdf";
import { Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import {
    Container,
    ListItem,
    CheckBox,
    Text,
    Content,
    Button,
} from "native-base";
import { HEALTH_INSURANCE_ID } from "../../config/institution-metadata";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "../../services/axios-instance";

import styles from "./styles";

const baseURL = axios.defaults.baseURL;

class HealthInsuranceTerms extends Component {
    state = {
        accept: false,
        termFilename: null,
    };

    componentDidMount = async () => {
        const { data: term } = await axios.get(
            `/termos/product/${HEALTH_INSURANCE_ID}`
        );

        this.setState({ termFilename: term.filename });
    };

    handleClickAcceptanceTerms = (accept) => {
        this.setState({ accept });
    };

    handleClickConfirmButton = () => {
        if (!this.state.accept) {
            return Alert.alert(
                "Aviso",
                "Aceite os termos de uso para prosseguir."
            );
        }

        Navigation.push(this.props.componentId, {
            component: {
                name: "tech.in.HealthInsuranceListScreen",
            },
        });
    };

    render() {
        const { accept, termFilename } = this.state;

        let screenContent = <LoadingScreen indicatorColor="#4055B3" />;
        if (termFilename) {
            const source = {
                uri: `${baseURL}/files/${termFilename}`,
                cache: true,
            };

            screenContent = (
                <Content style={styles.content}>
                    <Pdf source={source} style={styles.pdf} />

                    <ListItem
                        button
                        onPress={() => {
                            this.handleClickAcceptanceTerms(!accept);
                        }}
                    >
                        <CheckBox
                            onPress={() => {
                                this.handleClickAcceptanceTerms(!accept);
                            }}
                            checked={accept}
                            color="#4055B3"
                        />
                        <Text style={styles.text}>
                            Li e aceito os Termos de Uso e Politica de
                            Privacidade
                        </Text>
                    </ListItem>
                    <Button
                        full
                        style={[styles.button]}
                        onPress={this.handleClickConfirmButton}
                    >
                        <Text>CONTINUAR</Text>
                    </Button>
                </Content>
            );
        }

        return <Container style={styles.container}>{screenContent}</Container>;
    }
}

export default HealthInsuranceTerms;
