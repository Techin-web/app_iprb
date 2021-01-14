import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../../routes";

import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../util/Dimensions";

export default function Card(props) {
    const event = props.event;

    return (
        <TouchableOpacity
            style={styles.Card}
            onPress={() =>
                Navigation.push(props.componentId, {
                    component: {
                        name: navigationName.muralDetails,
                        passProps: {
                            event,
                        },
                    },
                })
            }
        >
            <Text style={styles.Title}>{event.eventname}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Card: {
        backgroundColor: "#5A74EB",
        width: "75%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: rh("3.2%"),
        borderRadius: 13,
        marginBottom: rh("3.5%"),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Title: {
        color: "#fff",
        fontWeight: "700",
        fontSize: rw("4%"),
        textTransform: "uppercase",
        textAlign: "center",
    },
});
