import React from "react";
import { Text, Platform } from "react-native";
import {
    Container,
    Content,
    List,
    ListItem,
    Right,
    Left,
    CheckBox,
    Spinner,
} from "native-base";
import { withAlertErrorComponent } from "../../components";

import styles from "./style";

class HealthInsuranceValue extends React.Component {
    componentDidMount() {
        this.props.fetchHealthInsuranceValues(this.props.selected.id);
    }

    formatMoney = (value) => {
        if (Platform.OS === "ios") {
            const format = {
                minimumFractionDigits: 2,
                style: "currency",
                currency: "BRL",
            };
            return value.toLocaleString("pt-BR", format);
        }

        return "R$ " + value.toFixed(2).replace(".", ",");
    };

    renderContent() {
        let { withCoparticipation, planValues } = this.props;
        planValues = planValues || [];
        return (
            <Container>
                <Content style={{ flex: 1 }}>
                    <Text
                        style={[
                            styles.text,
                            styles.container,
                            styles.listTextBold,
                        ]}
                    >
                        Selecione o tipo de plano
                    </Text>
                    <ListItem
                        style={[
                            styles.list,
                            styles.removeBorderBottom,
                            styles.container,
                        ]}
                        onPress={() => {
                            this.props.handleChangeRadio(true);
                        }}
                    >
                        <Left>
                            <CheckBox
                                style={styles.checkbox}
                                checked={withCoparticipation}
                                color="#5A74EB"
                                onPress={() => {
                                    this.props.handleChangeRadio(true);
                                }}
                            />
                            <Text style={styles.text}>Com coparticipação</Text>
                        </Left>
                    </ListItem>
                    <ListItem
                        style={[
                            styles.list,
                            styles.removeBorderBottom,
                            styles.container,
                        ]}
                        onPress={() => {
                            this.props.handleChangeRadio(false);
                        }}
                    >
                        <Left>
                            <CheckBox
                                style={styles.checkbox}
                                checked={!withCoparticipation}
                                color="#5A74EB"
                                onPress={() => {
                                    this.props.handleChangeRadio(false);
                                }}
                            />
                            <Text style={styles.text}>Sem coparticipação</Text>
                        </Left>
                    </ListItem>
                    <List style={styles.valuesList}>
                        <ListItem
                            style={[
                                styles.removeBorderBottom,
                                styles.alignTextList,
                            ]}
                        >
                            <Left style={styles.adjustWidth}>
                                <Text
                                    style={[
                                        styles.listText,
                                        styles.listTextBold,
                                    ]}
                                >
                                    Idade
                                </Text>
                            </Left>
                            <Right style={styles.adjustWidth}>
                                <Text
                                    style={[
                                        styles.listText,
                                        styles.listTextBold,
                                    ]}
                                >
                                    Valor
                                </Text>
                            </Right>
                        </ListItem>
                        {planValues.map((plan, i) => {
                            const message = !plan.ageEnd
                                ? `${plan.ageStart} ou mais anos`
                                : `Entre ${plan.ageStart} - ${plan.ageEnd} anos`;
                            return (
                                <ListItem key={i} style={styles.alignTextList}>
                                    <Left style={styles.adjustWidth}>
                                        <Text style={styles.listText}>
                                            {message}
                                        </Text>
                                    </Left>
                                    <Right style={styles.adjustWidth}>
                                        <Text style={[styles.listText]}>
                                            {this.formatMoney(plan.value)}
                                        </Text>
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </List>
                </Content>
            </Container>
        );
    }

    render() {
        const { loading } = this.props;
        return (
            <Container>
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

const HealthInsuranceValueComponent = withAlertErrorComponent(
    HealthInsuranceValue
);
export { HealthInsuranceValueComponent };
