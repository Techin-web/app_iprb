import React, { useState } from "react";
import { DatePicker, Item, Label, Input, Picker } from "native-base";
import {
    unmask,
    cpfMask,
    dateMask,
    phoneMask,
    cardNumberMask,
    postalCodeMask,
    cardExpirationDateMask,
    weightAndHeightMask,
    weightMask,
} from "./mask-utils";
import Icon from "react-native-vector-icons/dist/Entypo";

import styles from "../screens/defaultStyle";

const getValueWithMask = (name, value, values, setFieldValue, touch) => {
    value = value || "";
    switch (name) {
        case "cpf":
            return cpfMask(value);
        case "birthDate":
            return dateMask(value);
        case "phone":
            return phoneMask(value);
        case "postalCode":
        case "zipcode":
            return postalCodeMask(value);
        case "card_expiration_date":
            return cardExpirationDateMask(value);
        case "card_number":
            return cardNumberMask(value);
        case "weight":
            return weightMask(value);
        case "height":
            return weightAndHeightMask(value);
        default:
            return value;
    }
};

export const InputTextCustom = (props) => {
    const {
        name,
        label,
        placeholder,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        disabled,
        autocompleteValue,
        setFieldTouched,
        setFieldValue,
        typeInput = "text",
        selectMiddle,
        dataOptions = [],
        autoCapitalize = "words",
        keyboardType = "default",
        setIsSon,
    } = props;

    const [firstTime, setFirstTime] = useState(true);

    let value = values[name];
    const error = errors[name];
    const touchedEvent = touched[name];

    if (autocompleteValue && value !== autocompleteValue) {
        value = autocompleteValue;
        setFieldValue(name, value);
    }

    if (typeInput === "select" && !value && dataOptions.length && firstTime) {
        setFieldValue(name, dataOptions[0].value.toString());
        setFirstTime(false);
    }

    return (
        <>
            <Item
                stackedLabel
                error={!!touchedEvent && !!error}
                style={{ flex: 1 }}
            >
                <Label style={styles.textBlue}>
                    {" "}
                    {label} &nbsp;
                    {touchedEvent && error && (
                        <Label style={styles.formError}>{error}</Label>
                    )}
                </Label>
                {typeInput === "text" && (
                    <Input
                        disabled={disabled}
                        value={getValueWithMask(
                            name,
                            value,
                            values,
                            setFieldValue
                        )}
                        onChangeText={(str) =>
                            handleChange(name)(unmask(name, str))
                        }
                        onBlur={() => {
                            if (handleBlur) {
                                handleBlur(unmask(name, value));
                            }
                            setFieldTouched(name);
                        }}
                        placeholder={placeholder}
                        autoCapitalize={autoCapitalize}
                        keyboardType={keyboardType}
                    />
                )}
                {typeInput === "select" && (
                    <Picker
                        mode="dropdown"
                        iosHeader={label}
                        iosIcon={<Icon name="chevron-small-down" />}
                        style={[
                            styles.select,
                            selectMiddle && styles.selectMiddle,
                        ]}
                        selectedValue={value}
                        onValueChange={(val) => {
                            setFieldTouched(name, true);
                            setFieldValue(name, val);

                            if (val === "1" || val === "2") {
                                setIsSon(val);
                            }
                        }}
                    >
                        {dataOptions.map((option, i) => (
                            <Picker.Item
                                key={i}
                                label={option.label}
                                value={option.value.toString()}
                            />
                        ))}
                    </Picker>
                )}
                {typeInput === "date" && (
                    <DatePicker
                        locale={"pt-BR"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={placeholder}
                        textStyle={{ alignItems: "flex-start", flex: 1 }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(str) => {
                            let date = new Date(str).toLocaleDateString(
                                "pt-br"
                            );
                            setFieldTouched(name);
                            setFieldValue(name, date);
                        }}
                        disabled={false}
                    />
                )}
            </Item>
        </>
    );
};
