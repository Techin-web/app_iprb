import { StyleSheet } from "react-native";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../util/Dimensions";

export default StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
    },
    Text: {
        fontSize: rw("4%"),
        fontWeight: "bold",
    },
    MemberText: {
        fontSize: rw("3.4%"),
        textTransform: "uppercase",
        color: "#898989",
        fontWeight: "bold",
    },
    ProfileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: rw("10%"),
        paddingHorizontal: rw("5%"),
        width: rw("90%"),
        height: rw("39%"),
        backgroundColor: "#FFF",
        shadowColor: "#333",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
    },
    UsernameHolder: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingRight: rw("5%"),
        paddingTop: rh("4%"),
    },
    InstitutionNameHolder: {
        height: rh("10%"),
        width: rw("60%"),
        paddingTop: rh("1%"),
    },
    Avatar: {
        backgroundColor: "#999",
        height: rw("20%"),
        width: rw("20%"),
        borderRadius: rw("10%"),
        marginRight: rw("5%"),
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    Button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: rw("10%"),
        width: rw("50%"),
        height: rh("8%"),
        marginTop: rh("2%"),
        backgroundColor: "#FFF",
        shadowColor: "#333",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
    },
    TextButton: {
        fontSize: rw("4%"),
    },
    VersionText: {
        marginTop: rh("5%"),
        fontWeight: "bold",
        color: "#616161",
    },
});
