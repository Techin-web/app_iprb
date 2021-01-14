import React from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Navigation } from "react-native-navigation";
import MediaItems from "./MediaItems";
import Icon from "react-native-vector-icons/AntDesign";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../util/Dimensions";
import HyperText from "../../../../components/AutoLink";

function MuralDetails(props) {
    const event = { ...props.event };

    return (
        <ScrollView style={styles.ScrollView}>
            <View style={styles.Container}>
                <View style={styles.DateContainer}>
                    {/* {   event.mimetype !== "application/pdf" &&
                        <Text style={styles.DateText}>
                            {new Date(event.createdAt).toLocaleDateString("pt-br")}
                        </Text>
                    } */}
                    <Text style={styles.EventName}>{event.eventname}</Text>
                </View>
                <Text style={styles.EventDescription}>
                    {   !props.description && event.mimetype &&
                        <HyperText>{event.eventdescription}</HyperText>
                    }
                </Text>
                <View style={styles.MediaContainer}>
                    <MediaItems file={event} />
                </View>
            </View>
            <View style={styles.ButtonHolder}>
                <TouchableOpacity
                    style={styles.GoBackButton}
                    onPress={() => Navigation.pop(props.componentId)}
                >
                    <Icon name="arrowleft" size={rw("4.2%")} color="#537AF5" />
                    <Text style={styles.GoBackButtonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

MuralDetails.options = {
    topBar: {
        title: {
            text: "",
        },
    },
};

export default MuralDetails;

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: "#fff",
    },
    Container: {
        alignItems: "center",
        paddingTop: rh("4%"),
        paddingBottom: rh("8%"),
    },
    DateContainer: {
        backgroundColor: "#f6f6f6",
        width: "85%",
        marginBottom: rh("5%"),
        paddingVertical: rh("2%"),
        paddingHorizontal: rw("5%"),
        borderRadius: 13,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    DateText: {
        fontWeight: "700",
        fontSize: rw("4.2%"),
        color: "#000",
        marginBottom: rh("1.2%"),
    },
    EventName: {
        fontWeight: "700",
        fontSize: rw("4.2%"),
        color: "#6A6A6A",
        letterSpacing: 1,
    },
    EventDescription: {
        width: "80%",
        fontSize: rw("4%"),
        marginBottom: rh("3%"),
    },
    MediaContainer: {
        width: "80%",
    },
    ButtonHolder: {
        marginTop: rh("-5%"),
        alignItems: "center",
    },
    GoBackButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    GoBackButtonText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#537AF5",
        marginLeft: rw("3%"),
    },
});
