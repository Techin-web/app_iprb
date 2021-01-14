import React from "react";
import { Text, ScrollView, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../routes";
import { responsiveWidth as rw } from "../../../util/Dimensions";
import Button from "../../../components/Button";
import MaterialCommunityIcons from "react-native-vector-icons/dist/FontAwesome5";

import styles from "./styles";

class ChurchMap extends React.Component {
    navigateToMap = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: navigationName.churchMapDetails,
            },
        });
    };

    render() {
        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Container}>
                    <Text style={styles.Title}>Igreja</Text>
                    <MaterialCommunityIcons
                        name="church"
                        size={rw("50%")}
                        color="#fff"
                        style={styles.MainIcon}
                    />
                    <Text style={styles.Subtitle}>
                        Selecione a localização e deixe seu aplicativo de
                        geolocalização te guiar para a igreja de destino
                    </Text>
                    <Button
                        title="IPRB - Novo Gama"
                        dark
                        bold
                        extraLarge
                        large
                        onPress={this.navigateToMap}
                    />
                </View>
            </ScrollView>
        );
    }
}

ChurchMap.options = {
    topBar: {
        title: {
            text: "Igreja",
        },
    },
};

export default ChurchMap;
