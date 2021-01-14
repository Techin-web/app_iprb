import React, { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { getToken } from "../../../../../../../services/auth-token";

const ImageView = ({ imgUri }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        getCurrentToken();

        console.log(
            <Image
                resizeMode="contain"
                source={{
                    uri: imgUri,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }}
                style={{width:"100%", height:"100%"}}
            />
        );
    }, []);

    const getCurrentToken = async() => {
        const currentToken = await getToken();
        setToken(currentToken);
    }

    return (
        <ImageZoom
            cropWidth = { Dimensions.get('window').width }
            cropHeight = { Dimensions.get('window').height }
            imageWidth = { Dimensions.get('window').width }
            imageHeight = { Dimensions.get('window').height }
        >
            <Image
                resizeMode="contain"
                source={{
                    uri: imgUri,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }}
                style={{width:"100%", height:"100%"}}
            />
        </ImageZoom>
    );
}

export default ImageView;
