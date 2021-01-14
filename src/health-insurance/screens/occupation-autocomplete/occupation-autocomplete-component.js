import React, { Component } from "react";
import { View } from "react-native";
import {
    Container,
    Content,
    Text,
    Spinner,
    Item,
    Button,
    Input,
    List,
    ListItem,
    Left,
    Right,
} from "native-base";
import { Navigation } from "react-native-navigation";
import { withAlertErrorComponent } from "../../components";
import Icon from "react-native-vector-icons/dist/Feather";

import styles from "./style";

class OccupationAutocomplete extends Component {
    state = {
        occupationName: "",
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "dismiss") {
            Navigation.dismissModal(this.props.componentId);
        }
    }

    searchOccupation = () => {
        this.props.fetchOccupations(this.state.occupationName);
    };

    handleChoose = (name) => {
        this.props.setOccupation(name);
        Navigation.dismissModal(this.props.componentId);
    };

    handleChangeOccupationText = (occupationName) => {
        this.setState({ occupationName });
    };

    render() {
        const { occupations = [], loading } = this.props;

        return (
            <Container style={styles.container}>
                <View>
                    <Item>
                        <Icon name="search" size={16} />
                        <Input
                            placeholder="Profissão"
                            onChangeText={this.handleChangeOccupationText}
                        />
                        <Button transparent onPress={this.searchOccupation}>
                            <Text>Buscar</Text>
                        </Button>
                    </Item>
                </View>
                {loading ? (
                    <Spinner
                        color={styles.primaryColor.color}
                        style={styles.loading}
                    />
                ) : (
                    <Content>
                        {occupations.length === 0 && (
                            <View>
                                <Text>Nenhum resultado encontrado!</Text>
                            </View>
                        )}

                        <List>
                            {occupations.map(({ name }, index) => (
                                <ListItem
                                    key={index}
                                    onPress={() => this.handleChoose(name)}
                                >
                                    <Left>
                                        <Text>{name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                )}
            </Container>
        );
    }
}

const OccupationAutocompleteComponent = withAlertErrorComponent(
    OccupationAutocomplete
);
export { OccupationAutocompleteComponent };
