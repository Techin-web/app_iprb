import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../util/Dimensions";

export default StyleSheet.create({
    TabContainerStyle: {
        shadowColor: "#000",
        backgroundColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        height: 55,
    },
    TabBarUnderlineStyle: {
        backgroundColor: "#fff",
    },
    TabHeading: {
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    MainTabHeadingIOS: {
        marginTop: rw("-3%"),
        marginBottom: rw("-15%"),
        width: rw("30%"),
        alignSelf: "center",
        backgroundColor: "#537AF5",
        borderRadius: 60,
        borderWidth: 5,
        borderColor: "#EDF5FF",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    MainTabHeadingAndroid: {
        height: 120,
        width: 120,
        position: "absolute",
        top: -10,
        left: rw("50%") - 60,
        zIndex: 10000,
        alignSelf: "center",
        backgroundColor: "#537AF5",
        borderRadius: 60,
        borderWidth: 5,
        borderColor: "#EDF5FF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    LeftTabHeadingIconAndroid: {
        marginRight: rw("10%"),
    },
    RightTabHeadingIconAndroid: {
        marginLeft: rw("10%"),
    },
    ServiceText: {
        marginTop: rh("-5.5%"),
        color: "#EDF5FF",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: rw("3%"),
    },
    MainIconAndroid: {
        marginTop: -40,
        fontSize: rw("9%"),
        color: "#EDF5FF",

        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: {
            width: 0.4,
            height: 0.4,
        },
        textShadowRadius: 10,
    },
    MainIconIOS: {
        fontSize: rw("9%"),
        marginTop: -45,
        color: "#EDF5FF",

        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: {
            width: 0.4,
            height: 0.4,
        },
        textShadowRadius: 10,
    },
});
