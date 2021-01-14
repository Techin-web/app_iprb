import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Navigation } from "react-native-navigation";

import animation from '../../../assets/animation.json';

const AnimationFull = ({ props }) => {
    const [loading, setLoading] =  useState(true);

    useEffect(() => {
        async function loadPosition() {

        }

        loadPosition();
      }, []);

    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#6495ED",
        }}>
            <View style={{
                height: 200,
                width: "90%",
                paddingVertical: 16,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "space-between",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,

                elevation: 11,
            }}>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 32,
                    }}
                >
                    <LottieView
                        source={animation}
                        loop={false}
                        autoPlay
                        style={{
                            marginTop: -40,
                            zIndex: 2

                        }}
                    />
                    <View
                        style={{
                            backgroundColor: "#fff",
                            width: 62,
                            height: 62,
                            borderRadius: 31,
                            marginTop: -40,
                        }}
                    />
                </View>

                <View>
                    <Text
                        style={{
                            fontSize: 16,
                            textTransform: "uppercase"
                        }}
                    >
                        Cadastro bem sucedido!
                    </Text>
                    <TouchableOpacity
                        onPress={() => Navigation.pop(props.componentId)}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 32,
                            backgroundColor: "#6495ED",
                            borderRadius: 10,
                            paddingVertical: 16,
                            flexDirection: "row",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 11,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                marginRight: 20,
                                fontSize: 14,
                                textTransform: "uppercase",
                                color: "#fff"
                            }}
                        >
                            Login
                        </Text>
                        <AntDesign name="arrowright" color={"#fff"} size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

AnimationFull.options = {
    topBar: {
        visible: false,
    },
};

export default AnimationFull;
