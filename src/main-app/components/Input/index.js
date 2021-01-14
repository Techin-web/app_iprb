import React from "react";
import { TextInput } from "react-native";

import styles from "./styles";

export default function CustomInput(props) {
    const inputClasses = [styles.Input];
    const inputLength = props.value.length;
    let placeholderTextColor = "#9C9C9C";

    if (props.dense) {
        inputClasses.push(styles.DenseInput);
    }

    if (props.validatePlaceholder && !inputLength) {
        placeholderTextColor = "#F86F6F";
    }

    return (
        <TextInput
            style={inputClasses}
            placeholderTextColor={placeholderTextColor}
            {...props}
        />
    );
}
