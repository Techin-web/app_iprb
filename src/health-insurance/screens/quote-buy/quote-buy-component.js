import React from "react";
import { Navigation } from "react-native-navigation";
import {
    Container,
    Footer,
    Content,
    Text,
    Button,
    Icon,
    Spinner,
} from "native-base";
import { navigationConfig } from "../register-screens";
import { AlertComponent } from "../../components";

import styles from "./style";

export const QuoteBuyComponent = (props) => {
    const {
        holder = {},
        financialResponsible = {},
        familyMembers = [],
    } = props.order;

    const buttonBuyDisabled =
        !holder.complete || !financialResponsible.complete;
    const familyMembersValid =
        familyMembers.length !== 0 &&
        familyMembers.filter(({ complete }) => !complete).length === 0;

    const renderButtonIcon = (obj) => {
        let isValid = false;

        if (!Array.isArray(obj)) {
            isValid = obj.complete;
        } else {
            isValid = familyMembers;
        }

        return isValid ? (
            <Icon
                style={[styles.text, styles.alignIcon]}
                ios="ios-checkmark"
                android="md-checkmark"
            />
        ) : (
            <Icon
                style={[styles.textBlue, styles.alignIcon]}
                ios="ios-add"
                android="md-add"
            />
        );
    };

    const goToNextScreen = (data) => {
        console.log(
            "llllll >>> ",
            Navigation.push(props.componentId, {
                component: navigationConfig.payment,
            })
        );

        Navigation.push(props.componentId, {
            component: navigationConfig.payment,
        });
    };

    const handleBuy = () => {
        props
            .saveOrder({
                holder,
                financialResponsible,
                familyMembers,
                healthInsuranceId: props.healthInsurance.id,
            })
            .then((data) => {
                goToNextScreen(data);
            });
    };

    return (
        <Container style={styles.container}>
            {props.loading ? (
                <Spinner
                    color={styles.primaryColor.color}
                    style={styles.loading}
                />
            ) : (
                <Content>
                    <Button
                        full
                        bordered
                        iconRight
                        style={[
                            styles.button,
                            financialResponsible.complete
                                ? styles.buttonSelected
                                : null,
                        ]}
                        onPress={() => {
                            Navigation.push(props.componentId, {
                                component: navigationConfig.beneficiaryForm,
                            });
                        }}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                financialResponsible.complete
                                    ? styles.text
                                    : null,
                            ]}
                        >
                            ADICIONAR RESPONSÁVEL FINANCEIRO
                        </Text>
                        {renderButtonIcon(financialResponsible)}
                    </Button>
                    <Button
                        full
                        bordered
                        iconRight
                        style={[
                            styles.button,
                            holder.complete ? styles.buttonSelected : null,
                        ]}
                        onPress={() => {
                            Navigation.push(props.componentId, {
                                component:
                                    navigationConfig.beneficiaryFormHolder,
                            });
                        }}
                    >
                        <Text
                            style={[
                                styles.textBlue,
                                holder.complete ? styles.text : null,
                            ]}
                        >
                            ADICIONAR TITULAR
                        </Text>
                        {renderButtonIcon(holder)}
                    </Button>
                    <Button
                        full
                        bordered
                        iconRight
                        style={[
                            styles.button,
                            familyMembersValid ? styles.buttonSelected : null,
                        ]}
                        onPress={() => {
                            // if (familyMembers.length === 0) {
                            //     Navigation.push(props.componentId, {
                            //         component: navigationConfig.beneficiaryFormDependencies
                            //     });
                            // } else {
                            Navigation.push(props.componentId, {
                                component: navigationConfig.familyMemberList,
                            });
                            // }
                        }}
                    >
                        <Text
                            style={[
                                styles.textBlue,
                                familyMembersValid ? styles.text : null,
                            ]}
                        >
                            MEUS DEPENDENTES
                        </Text>
                    </Button>
                </Content>
            )}

            <AlertComponent {...props} />

            <Footer style={styles.footer}>
                <Button
                    full
                    rounded
                    style={[
                        styles.footerButton,
                        buttonBuyDisabled ? styles.buttonDisabled : null,
                    ]}
                    disabled={buttonBuyDisabled}
                    onPress={handleBuy}
                >
                    <Text>FINALIZAR COMPRA</Text>
                </Button>
            </Footer>
        </Container>
    );
};
