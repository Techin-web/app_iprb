import React from "react";
import { TextInputMask } from "react-native-masked-text";

import styles from "./styles";

export default function CustomInput(props) {
    const inputClasses = [styles.Input];
    const inputLength = props.value.length;
    let placeholderTextColor = "#9C9C9C";

    if (props.dense) {
        inputClasses.push(styles.DesneInput);
    }

    if (props.validatePlaceholder && !inputLength) {
        placeholderTextColor = "#F86F6F";
    }

    return (
        <TextInputMask
            style={inputClasses}
            placeholderTextColor={placeholderTextColor}
            {...props}
        />
    );
}
