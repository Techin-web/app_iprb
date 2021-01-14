import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Image } from "react-native";
// import { WebView } from "react-native-webview";
import Carousel, { Pagination } from "react-native-snap-carousel";
import API from "../../../../services/axios-instance";
import YoutubePlayer from "react-native-youtube-iframe";
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from "../../../../util/Dimensions";

import styles from "./styles";

function MediaDetails(props) {
    const [activeCarouselPage, setActiveCarouselPage] = useState(
        props.selectedItemIndex
    );
    const [allMidiaItems, setAllMidiaItems] = useState([]);
    const [videoActive, setVideoActive] = useState("");
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const getData = async() => {
            const allMidias = await props.midiaItems.concat(props.midiaVideoItems);

            setAllMidiaItems(allMidias);
        }

        getData();
    }, [props.midiaItems, props.midiaVideoItems]);

    useEffect(() => {
        const newArray = props.midiaItems.concat(props.midiaVideoItems);

        if(newArray[activeCarouselPage].url) {
            const [ , id] = String(newArray[activeCarouselPage].url).split('=');

            setVideoActive(id);
        }
    }, [activeCarouselPage]);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            // Alert.alert("video has finished playing!");
        }
      }, []);

    // const togglePlaying = useCallback(() => {
    //     setPlaying((prev) => !prev);
    // }, []);


    function _renderItem({ item, index }) {
        return item.url
            ?   <View>
                    <YoutubePlayer
                        height={300}
                        play={playing}
                        videoId={`${videoActive}`}
                        onChangeState={onStateChange}
                    />
                    {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
                </View>
            :   <Image
                    key={item.id}
                    style={styles.CarouselItem}
                    source={{
                        uri: API.defaults.baseURL + "/files/" + item.filename,
                    }}
                />
    }

    function PaginationComponent() {
        const entriesLength = props.midiaVideoItems.length + props.midiaItems.length;

        return (
            <Pagination
                dotsLength={entriesLength}
                activeDotIndex={activeCarouselPage}
                dotStyle={styles.PaginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    return (
        <View style={styles.Container}>
            <View style={{ height: rh("75%") }}>
                <Carousel
                    data={allMidiaItems}
                    renderItem={_renderItem}
                    firstItem={props.selectedItemIndex}
                    sliderWidth={rw("100%")}
                    itemWidth={rw("90%")}
                    onSnapToItem={(index) => setActiveCarouselPage(index)}
                />
            </View>
            <PaginationComponent />
        </View>
    );
}

MediaDetails.options = {
    topBar: {
        title: {
            text: "Mídias",
        },
    },
};

export default MediaDetails;
