import React, { useEffect, useState, Fragment } from "react";
import {
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../../../routes";
import Icon from "react-native-vector-icons/dist/MaterialIcons";
import API from "../../../../services/axios-instance";

const itemPerRow = 3;
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / itemPerRow;

function Album(props) {
    const [midiaItems, setMidiaItems] = useState([]);
    const [midiaVideoItems, setMidiaVideoItems] = useState([]);

    useEffect(() => {
        API.get("/midiaitem/user/" + props.item.id).then((res) => {
            setMidiaItems(res.data.midiaItems);
            setMidiaVideoItems(res.data.midiaVideoItems);
        });
    }, []);

    function onNavigateToMediaDetails(index) {
        Navigation.push(props.componentId, {
            component: {
                name: navigationName.mediasDetails,
                passProps: {
                    selectedItemIndex: index,
                    midiaItems: midiaItems,
                    midiaVideoItems: midiaVideoItems,
                },
            },
        });
    }

    function _renderItem({ item, index }) {
        return (
            <TouchableOpacity
                style={styles.MidiaButton}
                onPress={() => onNavigateToMediaDetails(index)}
            >
                {item.url ? (
                    <View style={[styles.MidiaItem, styles.VideoItem]}>
                        <Icon size={33} name="play-arrow" color="#eee" />
                    </View>
                ) : (
                    <Image
                        source={{
                            uri:
                                API.defaults.baseURL +
                                "/files/" +
                                item.filename,
                        }}
                        style={styles.MidiaItem}
                    />
                )}
            </TouchableOpacity>
        );
    }

    let renderedContent = (
        <View style={styles.TextHolder}>
            <Text style={styles.Text}>Nenhuma mídia disponível.</Text>
        </View>
    );
    if (midiaItems.length || midiaVideoItems.length) {
        renderedContent = (
            <FlatList
                key={(item) => item.id}
                style={styles.FlatList}
                numColumns={itemPerRow}
                data={[...midiaItems, ...midiaVideoItems]}
                renderItem={_renderItem}
            />
        );
    }

    return <Fragment>{renderedContent}</Fragment>;
}

Album.options = {
    topBar: {
        title: {
            text: "Mídias",
        },
    },
};

export default Album;

const styles = StyleSheet.create({
    FlatList: {
        backgroundColor: "#fff",
    },
    MidiaButton: {
        width: itemWidth,
        height: itemWidth,
        padding: 2,
    },
    MidiaItem: {
        height: "100%",
        width: "100%",
        backgroundColor: "#000",
    },
    VideoItem: {
        justifyContent: "center",
        alignItems: "center",
    },
    TextHolder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    Text: {
        fontSize: 20,
    },
});
