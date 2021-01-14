import React from "react";
import { showLocation } from "react-native-map-link";
import { Text, Linking, Platform } from "react-native";
import { Button, Container, Content, Icon } from "native-base";
import { phoneMask } from "../../components";
import styles from "./style";

class ProviderDetailComponent extends React.Component {
    listAppsOpenMap = ({ lat, long }) => {
        showLocation({
            latitude: lat,
            longitude: long,
            // sourceLatitude: -8.0870631,  // optionally specify starting location for directions
            // sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
            googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: "ChIJGVtI4by3t4kRr51d_Qm_x58", // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: "Abrir no Mapa", // optional (default: 'Open in Maps')
            dialogMessage: "Qual aplicativo gostaria de usar?", // optional (default: 'What app would you like to use?')
            cancelText: "Cancelar", // optional (default: 'Cancel')
            // appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        });
    };

    makeCall = (phone) => {
        let phoneNumber = "";
        if (Platform.OS === "android") {
            phoneNumber = "tel:${" + phone + "}";
        } else {
            phoneNumber = "telprompt:${" + phone + "}";
        }
        Linking.openURL(phoneNumber);
    };

    render() {
        let { provider } = this.props;
        console.log("pros", this.props);
        return (
            <Container style={styles.container}>
                <Content>
                    <Text style={styles.info}>{provider.name}</Text>
                    <Text style={styles.info}>{provider.address}</Text>

                    {provider.lat !== null && (
                        <Button
                            full
                            iconRight
                            style={styles.button}
                            onPress={() => {
                                this.listAppsOpenMap({
                                    lat: provider.lat,
                                    long: provider.long,
                                });
                            }}
                        >
                            <Text style={styles.text}>Como chegar</Text>
                            <Icon name="pin" style={styles.icon} />
                        </Button>
                    )}

                    <Button
                        full
                        style={styles.button}
                        onPress={() => {
                            this.makeCall(provider.phone);
                        }}
                    >
                        <Text style={styles.text}>
                            {phoneMask(provider.phone)}
                        </Text>
                    </Button>

                    <Text style={styles.info}>ESPECIALIDADES ATENDIDAS</Text>
                    <Text>{provider.description}</Text>
                </Content>
            </Container>
        );
    }
}

export { ProviderDetailComponent };
