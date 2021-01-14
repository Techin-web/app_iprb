import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Item, Label, Text } from "native-base";
import { Navigation } from "react-native-navigation";
import { navigationConfig } from "../screens/register-screens";
import Icon from "react-native-vector-icons/dist/Entypo";

import styles from "../screens/defaultStyle";

class AutocompleteComponent extends Component {
    state = {
        open: false,
    };

    handleOpenModal = () => {
        if (!this.state.open) {
            this.setState({ open: true }, () => {
                Navigation.showModal({
                    stack: {
                        children: [
                            {
                                component:
                                    navigationConfig.occupationAutocompleteModal,
                            },
                        ],
                    },
                });

                setTimeout(() => {
                    this.setState({ open: false });
                }, 2000);
            });
        }
    };

    render() {
        const {
            name,
            values,
            label,
            setFieldValue,
            autocompleteValue,
        } = this.props;

        let value = values[name];

        if (autocompleteValue && value !== autocompleteValue) {
            value = autocompleteValue;
            setFieldValue(name, value);
        }

        return (
            <TouchableOpacity onPress={this.handleOpenModal}>
                <Item
                    stackedLabel
                    style={{ flex: 1 }}
                    onPress={this.handleOpenModal}
                >
                    <Label style={styles.textBlue}> {label} &nbsp;</Label>
                    <Text style={{ alignSelf: "flex-start", paddingTop: 10 }}>
                        {value || "Selecione"}
                    </Text>
                </Item>
                <Icon
                    style={{ position: "absolute", top: 25, right: 0 }}
                    name="chevron-small-down"
                    size={25}
                />
            </TouchableOpacity>
        );
    }
}

export { AutocompleteComponent };
