import React, { Fragment, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function FullScreenAndroid(props) {
    const [pausedVideo, setPausedVideo] = useState(true);
    const [videoIsMuted, setVideoIsMuted] = useState(false);

    function togglePausedVideo() {
        setPausedVideo(!pausedVideo);
    }

    function toggleVideoHasVolume() {
        setVideoIsMuted(!videoIsMuted);
    }

    let playIcon = <Icon name="caretright" size={22} color="#000" />;
    if (!pausedVideo) {
        playIcon = <Icon name="pause" size={22} color="#000" />;
    }

    let volumeButton = <FeatherIcon name="volume-2" size={22} color="#000" />;
    if (videoIsMuted) {
        volumeButton = <FeatherIcon name="volume-x" size={22} color="#000" />;
    }

    return (
        <Fragment>
            <Video
                style={{ flex: 1, width: "100%", backgroundColor: "#000" }}
                source={props.source}
                paused={pausedVideo}
                muted={videoIsMuted}
                resizeMode="contain"
            />
            <View style={styles.buttonsHolder}>
                <TouchableOpacity onPress={props.closeModal}>
                    <Icon
                        name="arrowleft"
                        size={22}
                        color="#000"
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={togglePausedVideo}
                >
                    {playIcon}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={toggleVideoHasVolume}
                >
                    {volumeButton}
                </TouchableOpacity>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    Video: {
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
    },
    buttonsHolder: {
        backgroundColor: "#eee",
        borderColor: "#ccc",
        borderWidth: 0.6,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icon: {
        zIndex: 100,
        padding: 10,
    },
});
