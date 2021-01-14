import React, { useState, useEffect } from "react";
import {View, StyleSheet, TouchableOpacity, Modal, Image, Text } from "react-native";
import { getToken } from "../../../../../../services/auth-token";
import ImgView from './ImageView';
import Icon from "react-native-vector-icons/FontAwesome";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../../../util/Dimensions";

export default function ImageItem(props) {
    const [token, setToken] = useState(null);
    const [imgIsOpen, setImgIsOpen] = useState(false);

    useEffect(() => {
        getCurrentToken();
    }, []);

    async function getCurrentToken() {
        const currentToken = await getToken();
        setToken(currentToken);
    }

    return (
        <>
            <Modal
                animationType="slide"
                presentationStyle="fullScreen"
                statusBarTranslucent={true}
                visible={imgIsOpen}
                onRequestClose={() => setImgIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.closeModalIcon}
                    onPress={() => setImgIsOpen(false)}
                >
                    <View>
                        <Icon name="long-arrow-left" size={22} />
                    </View>
                </TouchableOpacity>
                <ImgView imgUri={props.baseURL + props.filename} />
            </Modal>
            <TouchableOpacity
                onPress={() => setImgIsOpen(true)}
            >
                <Image
                    resizeMode="contain"
                    source={{
                        uri: props.baseURL + props.filename,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }}
                    style={styles.ImageItem}
                />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    ImageItem: {
        height: 270,
        width: "100%",
    },
    closeModalIcon: {
        position: "absolute",
        top: "4%",
        left: "4%",
        zIndex: 1000,
        padding: 5,
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: 3,
    },
    OpenImgText: {
        fontWeight: "700",
        borderRadius: 13,
        paddingVertical: rh("1.5%"),
        paddingHorizontal: rw("5%"),
        color: "#fff",
        textAlign: "center",
        backgroundColor: "#0D42A1"
    },
});
