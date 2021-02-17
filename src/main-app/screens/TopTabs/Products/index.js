import React, { Component } from "react";
import {
    Image,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../routes";
import { HEALTH_INSURANCE_ID, AXA_TELEMEDICINA_ID } from "../../../config/institution-metadata";
import Card from "../../../components/CardTopTabs";
import IconFontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import axios from "../../../services/axios-instance";
import Plans from "../../../config/plans";
import IconTooSeguros from "../../../assets/tooseguros-logo.png";
import IconBancoPan from "../../../assets/logo-pan.png";
import CaixaCap from "../../../assets/caixacap-logo.png";
import Axa from "../../../assets/axa.png";

import { responsiveWidth as rw } from "../../../util/Dimensions";

import styles from "./styles";


class Products extends Component {
    state = {
        didMount: false,
    };

    componentDidMount = async () => {
        this.setState({ didMount: true });
    };

    onNavigateToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    plan: Plans[screenName],
                },
            },
        });
    };

    onNavigateToScreenWithTutorial = async (targetScreenName, productId) => {
        const { data: tutorial } = await axios.get(
            `/tutorial/${productId}`
        );

        let nextScreen = navigationName.productTutorial;
        if (!tutorial) {
            nextScreen = targetScreenName;
        }

        Navigation.push(this.props.componentId, {
            component: {
                name: nextScreen,
                passProps: {
                    nextScreen: targetScreenName,
                    productId: productId,
                    tutorial: tutorial
                },
            },
        });
    }

    viewPDF = async () => {
        try {
            const response = await axios.get("/ganhos");
            const event = response.data[0];

            console.log(event);

            return Navigation.push(this.props.componentId, {
                component: {
                    name: navigationName.muralDetails,
                    passProps: {
                        event,
                        description: true,
                    },
                },
            });
        } catch (err) {
            console.log(err);

            return;
        }

        /*return (
            <PdfItem
                baseURL={API_baseURLFiles}
                filename={file.filename}
                fileoriginalname={file.originalname}
            />
        )*/
    };

    render() {
        const { didMount } = { ...this.state };

        let mainCard = (
            <TouchableOpacity
                style={styles.Buttons}
                onPress={this.onNavigateToHealthInsurance}
            >
                <View>
                    <IconFontAwesome5
                        name="heartbeat"
                        style={styles.ButtonIcon}
                        size={rw("12%")}
                        color={"#246bb3"}
                    />
                </View>
                <Text style={styles.TextButtons}>Plano de Saúde</Text>
            </TouchableOpacity>
        );

        if (!didMount) {
            mainCard = <ActivityIndicator color="#fff" size="large" />;
        }

        return (
            <View style={styles.ScrollView}>
                <ScrollView>
                    <View style={styles.Container}>
                        <View style={styles.TopBox}>
                            <Text style={styles.TopBoxText}>O que eu ganho?</Text>
                            <TouchableOpacity
                                onPress={this.viewPDF}
                                style={styles.TopButton}
                            >
                                <Text style={styles.TopButtonText}>Saiba Mais</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ButtonsHolder}>
                            <Card
                                title="Plano de Saúde"
                                pressed={() =>
                                    this.onNavigateToScreenWithTutorial(
                                        "tech.in.HealthInsuranceListScreen", HEALTH_INSURANCE_ID
                                    )
                                }
                                icon={
                                    <IconFontAwesome5
                                        name="heartbeat"
                                        size={rw("12%")}
                                        color="#246bb3"
                                        style={styles.ButtonIcon}
                                    />
                                }
                            />
                            {/* <Card
                                title="Telemedicina"
                                pressed={() =>
                                    this.onNavigateToScreenWithTutorial(
                                        navigationName.axaTelemedicina, AXA_TELEMEDICINA_ID
                                    )
                                }
                                icon={
                                    <Image
                                        resizeMode="contain"
                                        source={Axa}
                                        style={styles.AxaIcon}
                                    />
                                }
                            /> */}
                        </View>
                        {/* <View style={styles.ButtonsHolder}>
                            <Card
                                title="Seguro Residencial"
                                pressed={() =>
                                    this.onNavigateToScreen(
                                        navigationName.toosegurosResidencial
                                    )
                                }
                                icon={
                                    <Image
                                        source={IconTooSeguros}
                                        style={styles.TooSegurosIcon}
                                    />
                                }
                                secondaryIcon={
                                    <Image
                                        source={IconBancoPan}
                                        style={styles.SecondaryIcon}
                                    />
                                }
                            />
                            <Card
                                title="Seguro Moto"
                                pressed={() =>
                                    this.onNavigateToScreen(
                                        navigationName.toosegurosMoto
                                    )
                                }
                                icon={
                                    <Image
                                        source={IconTooSeguros}
                                        style={styles.TooSegurosIcon}
                                    />
                                }
                                secondaryIcon={
                                    <Image
                                        source={IconBancoPan}
                                        style={styles.SecondaryIcon}
                                    />
                                }
                            />
                        </View>
                        <View style={[styles.ButtonsHolder]}>
                            <Card
                                title="Seguro Mais Cuidado"
                                pressed={() =>
                                    this.onNavigateToScreen(
                                        navigationName.toosegurosMaisCuidado
                                    )
                                }
                                icon={
                                    <Image
                                        source={IconTooSeguros}
                                        style={styles.TooSegurosIcon}
                                    />
                                }
                                secondaryIcon={
                                    <Image
                                        source={IconBancoPan}
                                        style={styles.SecondaryIcon}
                                    />
                                }
                            />
                        </View> */}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

Products.navigationOptions = {
    title: "Produtos",
};

export default Products;
