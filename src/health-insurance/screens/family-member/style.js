import { StyleSheet } from "react-native";
import defaultStyle from "../defaultStyle";

const styles = StyleSheet.create({
    ...defaultStyle,
    contenTitle: {
        fontSize: 15,
        fontWeight: "300",
        color: defaultStyle.primaryColor.color,
    },
    cardView: {
        flex: 1,
    },
    cardContentTitle: {
        paddingTop: 8,
        lineHeight: 14,
        fontSize: 12,
        fontWeight: "300",
        color: defaultStyle.primaryColor.color,
    },
    cardContentBody: {
        lineHeight: 18,
        fontSize: 15,
        fontWeight: "bold",
        color: defaultStyle.primaryDarkColor.color,
    },
    button: {
        marginTop: 37,
        justifyContent: "space-between",
        height: 64,
        borderColor: defaultStyle.primaryBackgroundColor.backgroundColor,
        backgroundColor: defaultStyle.primaryBackgroundColor.backgroundColor,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFF",
    },
    buttonIcon: {
        color: "#FFF",
        fontWeight: "bold",
        marginRight: 20,
        fontSize: 20,
    },
    buttonClose: {
        position: "absolute",
        right: 0,
    },
    closeIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    closeIcon: {
        fontSize: 25,
        ...defaultStyle.primaryDarkColor,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentCenter: {
        marginTop: 30,
        marginBottom: 15,
        flex: 1,
        textAlign: "center",
    },
    modalContent: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeModalIcon: {
        fontSize: 18,
        ...defaultStyle.primaryDarkColor,
    },
    modalTitle: {
        alignSelf: "center",
        marginBottom: -10,
        fontSize: 15,
        fontWeight: "600",
        ...defaultStyle.primaryDarkColor,
    },
    modalCloseIcon: {
        fontSize: 30,
        marginTop: -30,
        alignSelf: "flex-end",
        ...defaultStyle.primaryDarkColor,
    },
    modalMessage: {
        fontSize: 15,
        fontWeight: "300",
        ...defaultStyle.primaryColor,
    },
    modalButton: {
        marginTop: 16,
        borderRadius: 5,
        ...defaultStyle.primaryBackgroundColor,
    },
});

export default styles;
