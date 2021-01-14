import { StyleSheet, Platform } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../util/Dimensions";

export default StyleSheet.create({
    TabsContainer: {
        height: 80,
        borderBottomColor: "#ccc",
        backgroundColor: "#3F5EBE",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    TabBarUnderline: {
        backgroundColor: "#74F112",
    },
    TabHeading: {
        marginTop: 35,
        shadowColor: "transparent",
        backgroundColor: "#3F5EBE",
    },
    TabText: {
        color: "#fff",
    },
});
