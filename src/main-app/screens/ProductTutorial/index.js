import React, { Component } from "react";
import Pdf from "react-native-pdf";
import { Navigation } from "react-native-navigation";
import {
    Container,
    Text,
    Content,
    Button,
} from "native-base";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "../../services/axios-instance";

import styles from "./styles";

const baseURL = axios.defaults.baseURL;

class ProductTutorial extends Component {
    onBrowserNextScreenHandler = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: this.props.nextScreen,
            },
        });
    };

    render() {
        const { tutorial } = this.props;

        let screenContent = <LoadingScreen indicatorColor="#4055B3" />;
        if (tutorial.filename) {
            const source = {
                uri: `${baseURL}/files/${tutorial.filename}`,
                cache: true,
            };

            screenContent = (
                <Content style={styles.content}>
                    <Pdf source={source} style={styles.pdf} />

                    <Button
                        full
                        style={[styles.button]}
                        onPress={this.onBrowserNextScreenHandler}
                    >
                        <Text>CONTINUAR</Text>
                    </Button>
                </Content>
            );
        }

        return <Container style={styles.container}>{screenContent}</Container>;
    }
}

ProductTutorial.options = {
    topBar: {
        title: {
            text: "Tutorial",
        },
    },
};

export default ProductTutorial;
