import React, { Component } from "react";
import {
    Linking,
    Platform,
    Alert,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Text,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { navigationName } from "../../routes";
import { getToken, logout } from "../../services/auth-token";
import {
    INSTITUTION_NAME,
    APP_VERSION,
} from "../../config/institution-metadata";
import Icon from "react-native-vector-icons/FontAwesome5";
import { responsiveWidth as rw } from "../../util/Dimensions";
import ImagePicker from "react-native-image-picker";
import API from "../../services/axios-instance";

import styles from "./styles";

class UserSettings extends Component {
    state = {
        user: {},
        userAvatar: null,
        loading: false,
    };

    componentDidMount = () => {
        this.getUserData();
        this.getUserAvatar();
    };

    getUserData = async () => {
        try {
            const { data } = await API.get("/users");

            this.setUserData(data);
        } catch (err) {
            Alert.alert(
                "Erro",
                `Ocorreu um erro ao consultar usuario: ${err}`,
                [{ text: "OK" }]
            );
        }
    };

    setUserData = (newUserData) => {
        this.setState({ user: newUserData });
    };

    getUserAvatar = async () => {
        try {
            const avatar = await API.get("/avatar");
            if (!avatar) {
                return;
            }

            const token = await getToken();
            const uri = {
                uri: `${API.defaults.baseURL}/files/${avatar.data.avatarPath}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            this.setState({ userAvatar: uri });
        } catch (err) {
            console.log(err);
        }
    };

    onClickedAvatarHandler = () => {
        this.setState({ loading: true });

        const optionsAvatar = {
            title: "Selecione o avatar com",
            takePhotoButtonTitle: "Tirando uma foto",
            chooseFromLibraryButtonTitle: "Selecionando na galeria",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };

        ImagePicker.showImagePicker(optionsAvatar, (response) => {
            if (response.error) {
                return this.setState({ loading: false });
            }

            if (response.didCancel) {
                return this.setState({ loading: false });
            }

            this.handleSendPicture(response);
        });
    };

    handleSendPicture = async (response) => {
        try {
            const fd = new FormData();

            fd.append("file", {
                name:
                    new Date().toISOString() +
                    "." +
                    response.type.split("image/")[1],
                type: response.type,
                uri:
                    Platform.OS === "android"
                        ? response.uri
                        : response.uri.replace("file://", ""),
            });

            const { data } = await API.post("/avatar", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const source = { uri: "data:image/jpeg;base64," + data };

            this.setState({ userAvatar: source, loading: false });
        } catch (err) {
            this.setState({ loading: false });
            Alert.alert(
                "Ocorreu um erro",
                "Por favor tente realizar o upload da foto de perfil novamente."
            );
        }
    };

    onLogoutHandler = async () => {
        await logout();

        Navigation.setStackRoot(this.props.componentId, {
            component: { name: navigationName.signIn },
        });
    };

    render() {
        const { user, userAvatar, loading } = this.state;

        return (
            <View style={styles.Container}>
                <View style={styles.ProfileCard}>
                    <TouchableOpacity
                        onPress={() => this.onClickedAvatarHandler()}
                    >
                        <View style={styles.Avatar}>
                            {userAvatar ? (
                                loading ? (
                                    <ActivityIndicator
                                        size="large"
                                        color="#61acb4"
                                    />
                                ) : (
                                    <Image
                                        source={userAvatar}
                                        style={{
                                            width: rw("20%"),
                                            height: rw("20%"),
                                        }}
                                    />
                                )
                            ) : (
                                <Icon
                                    name="user-alt"
                                    size={30}
                                    color="#5C859B"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.UsernameHolder}>
                        <Text style={styles.Text}>{user.name}</Text>
                        <View style={styles.InstitutionNameHolder}>
                            <Text style={styles.MemberText}>
                                {INSTITUTION_NAME}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() =>
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: navigationName.editProfile,
                                passProps: {
                                    user,
                                    onChangeUserData: this.setUserData,
                                },
                            },
                        })
                    }
                >
                    <Text style={styles.TextButton}>Alterar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.TextButton}>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                        Linking.openURL(
                            `mailto:suporte@tech-inweb.com.br?subject=Suporte - ${INSTITUTION_NAME}`
                        );
                    }}
                >
                    <Text style={styles.TextButton}>Ajuda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={this.onLogoutHandler}
                >
                    <Text style={styles.TextButton}>Sair</Text>
                </TouchableOpacity>
                <Text style={styles.VersionText}>Versão {APP_VERSION}</Text>
            </View>
        );
    }
}

UserSettings.navigationOptions = {
    title: "Configurações",
};

export default UserSettings;
