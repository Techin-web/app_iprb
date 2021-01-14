import React from "react";
import { Navigation } from "react-native-navigation";
import { Text, Linking, Platform } from "react-native";
import { Container, Content, Button, Item, View, Spinner } from "native-base";
import { TextDivisor } from "../../components";
import { navigationConfig } from "../register-screens";
import Icon from "react-native-vector-icons/dist/Entypo";

import styles from "./style";

class ProviderComponent extends React.Component {
    componentDidMount() {
        this.props.fetchProvider(this.props.healthInsuranceSelected.id);
    }

    handleClickButton = (provider) => {
        this.props.setProviderDetail(provider);
        Navigation.push(this.props.componentId, {
            component: navigationConfig.providerDetail,
        });
    };

    handleClickButtonExternalLink = (link) => {
        Linking.openURL(link);
    };

    renderList(providers) {
        const { healthInsuranceSelected } = this.props;
        const { externalUrl } = healthInsuranceSelected;
        return (
            <>
                <TextDivisor text="Locais que aceitam seu plano." />
                {providers.map((provider, i) => {
                    return (
                        <Button
                            full
                            iconLeft
                            key={i}
                            style={styles.button}
                            onPress={() => {
                                this.handleClickButton(provider);
                            }}
                        >
                            <Icon name="pin" style={styles.icon} />
                            <Item
                                style={styles.containerText}
                                button
                                onPress={() => {
                                    this.handleClickButton(provider);
                                }}
                            >
                                <Text style={styles.text}>{provider.name}</Text>
                                <Text style={[styles.text, styles.subtitle]}>
                                    {provider.city} - {provider.state}
                                </Text>
                            </Item>
                        </Button>
                    );
                })}
                {(externalUrl !== "") && (
                    <Button
                        full
                        iconLeft
                        key={"external-link"}
                        style={[styles.button, styles.greenButton]}
                        onPress={() => {
                            this.handleClickButtonExternalLink(externalUrl);
                        }}
                    >
                        <Item
                            style={styles.containerText}
                            button
                            onPress={() => {
                                this.handleClickButtonExternalLink(externalUrl);
                            }}
                        >
                            <Text style={styles.text}>
                                Rede Credenciada Completa
                            </Text>
                            <Text style={[styles.text, styles.subtitle]}>
                                Clique para ver mais
                            </Text>
                        </Item>
                    </Button>
                )}
            </>
        );
    }

    noData() {
        return (
            <View style={styles.noHealthInsurances}>
                <Text>Não possui rede credenciada cadastrada.</Text>
            </View>
        );
    }

    renderContent() {
        const { providers } = this.props;
        const render = providers.length
            ? this.renderList(providers)
            : this.noData();
        return <Content>{render}</Content>;
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

export { ProviderComponent };
