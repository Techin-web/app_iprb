import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../util/Dimensions";
import Card from "./Card";
import API from "../../../services/axios-instance";

function Mural(props) {
    const [muralEvents, setMuralEvents] = useState([]);

    useEffect(() => {
        API.get("/murals")
            .then((res) => setMuralEvents(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const eventsCard = muralEvents.map((event) => {
        return (
            <Card
                key={event.id}
                event={event}
                componentId={props.componentId}
            />
        );
    });

    return (
        <ScrollView style={styles.ScrollView}>
            <View style={styles.Container}>
                <Text style={styles.Title}>Publicações</Text>
                <Text style={styles.Subtitle}>
                    Tenha acesso a todas as nossos atividades
                </Text>
                {eventsCard}
            </View>
        </ScrollView>
    );
}

Mural.options = {
    topBar: {
        title: {
            text: "Publicações",
        },
    },
};

export default Mural;

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: "#fff",
    },
    Container: {
        backgroundColor: "#fff",
        paddingTop: rh("7%"),
        paddingBottom: rh("5%"),
        alignItems: "center",
    },
    Title: {
        color: "#5A74EB",
        textTransform: "uppercase",
        fontSize: rw("6%"),
        fontWeight: "700",
        marginBottom: rh("2%"),
    },
    MainIcon: {
        marginBottom: rh("3%"),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    Subtitle: {
        textAlign: "center",
        fontWeight: "700",
        width: "75%",
        fontSize: rw("4%"),
        textTransform: "uppercase",
        color: "#515151",
        marginBottom: rh("5%"),
    },
});
