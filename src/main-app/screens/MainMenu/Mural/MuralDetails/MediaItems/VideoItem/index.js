import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Platform,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import Video from "react-native-video";
import FullscreenAndroidVideo from "./FullscreenAndroidVideo";

export default function VideoItem(props) {
    const [pausedVideo, setPausedVideo] = useState(true);
    const [videoIsMuted, setVideoIsMuted] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fullscreenMode, setFullscreenMode] = useState(false);

    function togglePausedVideo() {
        setPausedVideo(!pausedVideo);
    }

    function toggleVideoHasVolume() {
        setVideoIsMuted(!videoIsMuted);
    }

    function openModal() {
        setPausedVideo(true);

        if (Platform.OS === "android") {
            setModalIsOpen(true);
        } else {
            setFullscreenMode(true);
        }
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
        <View style={styles.VideoContainer}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalIsOpen}
            >
                <FullscreenAndroidVideo
                    source={{
                        uri: props.baseURL + props.filename,
                    }}
                    closeModal={() => setModalIsOpen(false)}
                />
            </Modal>
            <View style={styles.buttonsHolder}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={togglePausedVideo}
                >
                    {playIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={openModal}>
                    <FeatherIcon
                        name="maximize"
                        size={22}
                        color="#000"
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={toggleVideoHasVolume}
                >
                    {volumeButton}
                </TouchableOpacity>
            </View>

            <Video
                style={styles.Video}
                source={{
                    uri: props.baseURL + props.filename,
                }}
                paused={pausedVideo}
                muted={videoIsMuted}
                fullscreen={fullscreenMode}
                onFullscreenPlayerDidDismiss={() => setFullscreenMode(false)}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    VideoContainer: {
        backgroundColor: "#000",
        width: "100%",
    },
    Video: {
        height: 270,
        width: "100%",
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
