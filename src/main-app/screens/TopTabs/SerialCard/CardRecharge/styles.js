import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../util/Dimensions";

export default StyleSheet.create({
    ScrollView: {
        backgroundColor: "#FFF",
    },
    Container: {
        paddingTop: rh("3%"),
        alignItems: "center",
    },
    MainText: {
        fontSize: rw("3.8%"),
        width: "85%",
        textAlign: "center",
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#707070",
        marginBottom: rh("1.5%"),
    },
    SecondaryText: {
        fontSize: rw("3.6%"),
        color: "#3752A6",
        fontWeight: "700",
        marginBottom: rh("3%"),
    },
    Picker: {
        backgroundColor: "#EDF5FF",
        borderColor: "#A9CEFF",
        borderWidth: 1,
        width: "60%",
    },
    PickerContainer: {
        height: 50,
    },
    FilterPickerContainer: {
        height: 40,
        marginBottom: rh("3%"),
    },
    PickerLabel: {
        fontSize: rw("3%"),
        textTransform: "uppercase",
        color: "#707070",
        fontWeight: "700",
    },
    PickerDropdown: {
        width: "60%",
    },
    InputHolder: {
        minHeight: 90,
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
    },
    InputLabel: {
        alignSelf: "flex-start",
        fontWeight: "700",
        color: "#707070",
    },
    Input: {
        borderColor: "#000",
        color: "#000",
        borderWidth: 0.4,
        width: "100%",
        height: 40,
        textAlign: "center",
        borderRadius: 2,
    },
    HistoryContainer: {
        backgroundColor: "#537AF5",
        marginTop: rh("3%"),
        width: "100%",
        alignItems: "center",
        paddingTop: rh("2%"),
        paddingBottom: rh("5%"),
    },
    HistoryTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: rw("5%"),
        textTransform: "uppercase",
        marginBottom: rh("2%"),
    },
});
