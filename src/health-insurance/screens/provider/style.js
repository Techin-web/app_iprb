import { Dimensions, StyleSheet } from "react-native";
import defaultStyle from "../defaultStyle";

const styles = StyleSheet.create({
    ...defaultStyle,
    button: {
        height: 60,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        justifyContent: "flex-start",
        backgroundColor: "#5A74EB",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOpacity: 1.0,
    },
    greenButton: {
        backgroundColor: "#33B05D",
        marginTop: 30,
    },
    containerText: {
        flexDirection: "column",
        marginLeft: 25,
        borderBottomWidth: 0,
        alignItems: "flex-start",
    },
    icon: {
        fontSize: 36,
        marginLeft: 20,
        color: "#eee",
    },
    subtitle: {
        fontSize: 12,
        marginTop: 3,
    },
    text: {
        color: "white",
    },
    noHealthInsurances: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").width,
    },
});

export default styles;
