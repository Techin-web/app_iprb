import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { Container, Content, Spinner, Text, View } from "native-base";
import { withAlertErrorComponent } from "../../components";
import { navigationConfig } from "../register-screens";
import { BASE_URL } from "../../services";
import styles from "./style";

const baseURL = BASE_URL.replace("/api", "");

class HealthInsuranceList extends React.Component {
    state = {
        nextScreen: false,
    };

    componentDidMount() {
        this.props.login().then(() => {
            this.props.fetchHealthInsurance();
        });
    }

    componentDidUpdate() {
        if (this.props.goto) {
            this.props.removeAcceptanceTermGoto();
            Navigation.push(this.props.componentId, {
                component: navigationConfig.healthInsuranceDetail,
            });
        }
    }

    handleClickNextScreen = (healthInsurance) => {
        this.props.setHealthInsuranceSelected(healthInsurance);
        this.props.fetchAcceptanceTerm(healthInsurance.id).then((data) => {
            Navigation.push(this.props.componentId, {
                component: navigationConfig.healthInsuranceDetail,
            });
            this.setState({ nextScreen: true });
        });
    };

    renderContent() {
        const { healthInsurances } = this.props;

        return (
            <Content>
                {healthInsurances.map((healthInsurance, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            button
                            onPress={() => {
                                this.handleClickNextScreen(healthInsurance);
                            }}
                        >
                            <Image
                                source={{
                                    uri: `${baseURL}/logo/${healthInsurance.id}`,
                                }}
                                style={{
                                    width: "90%",
                                    height: 100,
                                    marginTop: 30,
                                    marginLeft: "5%",
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={styles.healthInsuranceTitle}>
                                {healthInsurance.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                {!healthInsurances.length && (
                    <View style={styles.noHealthInsurances}>
                        <Text>Sem planos disponíveis para venda.</Text>
                    </View>
                )}
            </Content>
        );
    }

    render() {
        const { loading } = this.props;
        return (
            <Container style={styles.container}>
                {loading ? (
                    <Spinner
                        color={styles.primaryColor.color}
                        style={styles.loading}
                    />
                ) : (
                    this.renderContent()
                )}
            </Container>
        );
    }
}

const HealthInsuranceListComponent = withAlertErrorComponent(
    HealthInsuranceList
);
export { HealthInsuranceListComponent };
