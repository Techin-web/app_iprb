import React from "react";
import { View, Text, Linking, Platform } from "react-native";
import Button from "../../../../components/Button";
import MapView, { Marker } from "react-native-maps";
import RNLocation from "react-native-location";
import FoundationIcon from "react-native-vector-icons/Foundation";
import { responsiveWidth as rw } from "../../../../util/Dimensions";

import styles from "./styles";

const IPRB_LOCALE = {
    latitude: -16.021838,
    longitude: -48.061636,
};

class ChurchMapDetails extends React.Component {
    state = {
        location: {},
        initialRegion: null,
    };

    componentDidMount() {
        RNLocation.configure({
            distanceFilter: 5.0,
        });

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse", // or 'fine'
                rationale: {
                    title: "Nós precisamos da sua localização",
                    message:
                        "Nós usamos sua localização para visualizar onde você está no mapa",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel",
                },
            },
        }).then((granted) => {
            if (granted) {
                const unsubscribe = RNLocation.subscribeToLocationUpdates(
                    (locations) => {
                        let minX, maxX, minY, maxY;
                        minX = Math.min(
                            locations[0].latitude,
                            IPRB_LOCALE.latitude
                        );
                        maxX = Math.max(
                            locations[0].latitude,
                            IPRB_LOCALE.latitude
                        );
                        minY = Math.min(
                            locations[0].longitude,
                            IPRB_LOCALE.longitude
                        );
                        maxY = Math.max(
                            locations[0].longitude,
                            IPRB_LOCALE.longitude
                        );

                        const deltaX = maxX - minX;
                        const deltaY = maxY - minY;

                        this.setState({
                            location: {
                                latitude: locations[0].latitude,
                                longitude: locations[0].longitude,
                            },
                            initialRegion: {
                                latitude:
                                    (locations[0].latitude +
                                        IPRB_LOCALE.latitude) /
                                    2,
                                longitude:
                                    (locations[0].longitude +
                                        IPRB_LOCALE.longitude) /
                                    2,
                                longitudeDelta: deltaX * 2.5,
                                latitudeDelta: deltaY * 2.5,
                            },
                        });
                    }
                );
                // unsubscribe()
            }
        });
    }

    launchMaps() {
        const scheme = Platform.select({
            ios: "maps:0,0?q=",
            android: "geo:0,0?q=",
        });
        const latLng = `${IPRB_LOCALE.latitude},${IPRB_LOCALE.longitude}`;
        const label = "IPRB";
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });

        Linking.openURL(url);
    }

    render() {
        const { location, initialRegion } = { ...this.state };

        return (
            <View style={styles.Container}>
                {initialRegion ? (
                    <MapView
                        initialRegion={{
                            ...initialRegion,
                        }}
                        style={styles.MapView}
                    >
                        <Marker
                            coordinate={IPRB_LOCALE}
                            title="IPRB"
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: rw("5%"),
                                    fontWeight: "bold",
                                    color: "#2E86C1",
                                }}
                            >
                                IPRB
                            </Text>
                            <FoundationIcon
                                name="marker"
                                size={rw("10%")}
                                color="#2E86C1"
                            />
                        </Marker>
                        {location && location.latitude && location.longitude ? (
                            <Marker coordinate={location} title="Voce" />
                        ) : null}
                    </MapView>
                ) : null}
                <View style={styles.BUttonHolder}>
                    <Button
                        title="Como chegar"
                        bold
                        extraLarge
                        large
                        dark
                        leftIcon={
                            <FoundationIcon
                                name="marker"
                                size={rw("8%")}
                                color="#fff"
                            />
                        }
                        onPress={this.launchMaps}
                    />
                </View>
            </View>
        );
    }
}

ChurchMapDetails.options = {
    topBar: {
        title: {
            text: "Localização",
        },
    },
};

export default ChurchMapDetails;
