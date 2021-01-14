import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { CheckBox } from "native-base";

import styles from "./styles";

export default function CheckboxComponent(props) {
    return (
        <TouchableOpacity
            style={styles.CheckBoxWithText}
            onPress={props.pressed}
        >
            <CheckBox checked={props.checked} onPress={props.pressed} />
            <Text style={styles.CheckBoxText}>{props.label}</Text>
        </TouchableOpacity>
    );
}
