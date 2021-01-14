import React, { Component } from "react";
import {
    Linking,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/dist/MaterialIcons";
import Entypoicons from "react-native-vector-icons/dist/Entypo";
import { responsiveWidth as rw } from "../../../util/Dimensions";
import API from "../../../services/axios-instance";

import styles from "./styles";

class Chat extends Component {
    state = {
        chats: [],
    };

    componentDidMount = async () => {
        const { data } = await API.get("/chats");

        this.setState({ chats: data });
    };

    launchApp(chat) {
        if (chat.phone) {
            Linking.openURL(
                "https://api.whatsapp.com/send?phone=55" + chat.phone
            );
        } else {
            Linking.openURL(chat.group_link);
        }
    }

    render() {
        let chatsElement;
        if (this.state.chats) {
            chatsElement = this.state.chats.map((chat) => {
                return (
                    <TouchableOpacity
                        key={chat.id}
                        style={styles.Card}
                        onPress={() => this.launchApp(chat)}
                    >
                        <View style={styles.CardIconHolder}>
                            <Entypoicons
                                name="chat"
                                size={rw("10%")}
                                color="#eee"
                            />
                        </View>
                        <View style={styles.CardNameHolder}>
                            <Text style={styles.CardName}>{chat.name}</Text>
                        </View>
                        <View style={styles.CardIconHolder}>
                            <Entypoicons
                                name="chevron-small-right"
                                size={rw("13%")}
                                color="#eee"
                            />
                        </View>
                    </TouchableOpacity>
                );
            });
        }

        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Container}>
                    <Ionicons
                        name="phone-in-talk"
                        size={rw("40%")}
                        color="#537AF5"
                        style={styles.MainIcon}
                    />
                    <Text style={styles.Subtitle}>
                        Aqui você pode entrar em contato direto com alguém
                        responsável pela sua instituição
                    </Text>
                    {chatsElement}
                </View>
            </ScrollView>
        );
    }
}

Chat.options = {
    topBar: {
        title: {
            text: "Chat",
        },
    },
};

export default Chat;
