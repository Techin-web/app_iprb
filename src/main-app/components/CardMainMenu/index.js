import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { responsiveWidth as rw } from "../../util/Dimensions";
import MenuIcon from "react-native-vector-icons/dist/MaterialIcons";

import styles from "./styles";

export default function MenuCards({ icon, children, name, pressed }) {
    return (
        <TouchableOpacity style={styles.container} onPress={pressed}>
            <MenuIcon name={icon} size={rw("15%")} color="#246bb3" />
            {children}
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}
