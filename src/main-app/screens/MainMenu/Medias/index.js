import React, { useState, useEffect } from "react";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../routes";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { responsiveWidth as rw } from "../../../util/Dimensions";
import Icon from "react-native-vector-icons/dist/Ionicons";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import API from "../../../services/axios-instance";

import styles from "./styles";

function Medias(props) {
    const [midiasAlbuns, setMidiasAlbuns] = useState([]);

    useEffect(() => {
        API.get("/midias")
            .then((res) => setMidiasAlbuns(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const midiaCards = midiasAlbuns.map((item) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.Card}
                onPress={() =>
                    Navigation.push(props.componentId, {
                        component: {
                            name: navigationName.mediasAlbum,
                            passProps: {
                                item,
                            },
                        },
                    })
                }
            >
                <View style={styles.CardIconHolder}>
                    <Icon
                        name="ios-image"
                        size={rw("10%")}
                        color="#eee"
                        style={styles.CardIcon}
                    />
                </View>
                <View style={styles.CardNameHolder}>
                    <Text style={styles.CardName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    });
    return (
        <ScrollView style={styles.ScrollView}>
            <View style={styles.Container}>
                <Text style={styles.Title}>Mídias</Text>
                <FontAwesome
                    name="photo"
                    size={rw("40%")}
                    color="#537AF5"
                    style={styles.MainIcon}
                />
                <Text style={styles.Subtitle}>
                    Clique nos links abaixo para acessar nossa galeria de fotos
                    e vídeos
                </Text>
                {midiaCards}
            </View>
        </ScrollView>
    );
}

Medias.options = {
    topBar: {
        title: {
            text: "Mídias",
        },
    },
};

export default Medias;
