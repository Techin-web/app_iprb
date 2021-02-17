import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { Container, Content, Spinner, Text, View } from "native-base";
import { withAlertErrorComponent } from "../../components";
import { navigationConfig } from "../register-screens";
import { BASE_URL } from "../../services";
import styles from "./style";

const baseURL = BASE_URL.replace("/api", "");

const RenderContent = ({ handleClickNextScreen, healthInsurances, update }) => {
    return (
        update
            ? <Spinner
                color={styles.primaryColor.color}
                style={styles.loading}
            />
            : <Content>
                {healthInsurances.map((healthInsurance, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            button
                            onPress={() => {
                                handleClickNextScreen(healthInsurance);
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
                    )}
                )}
                { !healthInsurances[0] &&
                    <View style={styles.noHealthInsurances}>
                        <Text>Sem planos disponíveis para venda.</Text>
                    </View>
                }
            </Content>
    );
}

class HealthInsuranceList extends React.Component {
    state = {
        nextScreen: false,
        healthInsurances: [],
        update: false,
    };

    componentDidMount() {
        this.props.login().then(() => {
            this.props.fetchHealthInsurance();
        });

        if(!this.props.healthInsurances[0]) {
            this.setState({ update: true });

            setTimeout(() => {
                this.setState({ healthInsurances: this.props.healthInsurances });
                this.setState({ update: false });
            }, 2000);
        }else {
            this.setState({ healthInsurances: this.props.healthInsurances });
        }
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

    render() {
        return (
            <Container style={styles.container}>
                <RenderContent handleClickNextScreen={this.handleClickNextScreen} healthInsurances={this.state.healthInsurances} update={this.state.update} />
            </Container>
        );
    }
}

const HealthInsuranceListComponent = withAlertErrorComponent(
    HealthInsuranceList
);
export { HealthInsuranceListComponent };
