import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../routes";
import { BR_MONTH } from "../../util/Month";
import API from "../../services/axios-instance";
import Card from "../../components/CardMainMenu";
import StatusBarIOS from "../../components/StatusBarIOS";

import styles from "./styles";

class MainMenu extends Component {
    state = {
        institution: {},
    };

    componentDidMount = async () => {
        const { data: institution } = await API.get("/institutions");
        this.setState({ institution });
    };

    onNavigateHandler = (routeName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: routeName,
            },
        });
    };

    render() {
        const institutionalMessage =
            this.state.institution.institutional_message ||
            "Nenhum aviso disponível.";

        const currenteDay = new Date()
            .toLocaleDateString("en-US")
            .split("/")[1];

        const currentMonth = new Date().getMonth();

        return (
            <View style={styles.Container}>
                <StatusBarIOS />

                <View style={styles.Card1}>
                    <View style={styles.Card1Left}>
                        <Text style={styles.TextData}>{currenteDay}</Text>
                        <Text style={[styles.TextData, styles.TextDay]}>
                            {BR_MONTH[currentMonth]}
                        </Text>
                    </View>
                    <View style={styles.Card1Right}>
                        <Text style={styles.Card1RightTitle}>
                            Avisos
                        </Text>
                        <Text style={styles.Text}>{institutionalMessage}</Text>
                    </View>
                </View>

                <View style={styles.ContainerCards}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.CardsRow}>
                            <Card
                                name="Chat"
                                icon="chat"
                                pressed={() =>
                                    this.onNavigateHandler(navigationName.chat)
                                }
                            />
                            <Card
                                name="Mídias"
                                icon="perm-media"
                                pressed={() =>
                                    this.onNavigateHandler(
                                        navigationName.medias
                                    )
                                }
                            />
                        </View>
                        <View style={styles.CardsRow}>
                            <Card
                                name="Eventos"
                                icon="image"
                                pressed={() =>
                                    this.onNavigateHandler(navigationName.mural)
                                }
                            />
                            <Card
                                name="Localização"
                                icon="location-on"
                                pressed={() =>
                                    this.onNavigateHandler(
                                        navigationName.churchMap
                                    )
                                }
                            />
                        </View>
                        <View style={styles.CardsRow}>
                            <Card
                                name="Bíblia"
                                icon="book"
                                pressed={() =>
                                    this.onNavigateHandler(navigationName.bible)
                                }
                            />
                            <Card
                                name="Hinário"
                                icon="library-music"
                                pressed={() =>
                                    this.onNavigateHandler(navigationName.hymns)
                                }
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default MainMenu;
