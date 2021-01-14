import React, { Component } from "react";
import { Modal, View } from "react-native";
import { Button, Text } from "native-base";
import Icon from "react-native-vector-icons/dist/AntDesign";
import styles from "./style";

class FamilyMemberDeleteModal extends Component {
    handleClose(remove) {
        const { onClose, index } = this.props;
        if (onClose) {
            onClose(index, remove);
        }
    }

    render() {
        const { modalVisible } = this.props;
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalTitle}>
                                    Remover Dependente
                                </Text>
                                <Button
                                    transparent
                                    style={styles.modalCloseIcon}
                                    onPress={() => this.handleClose(false)}
                                >
                                    <Icon
                                        name="close"
                                        style={styles.closeModalIcon}
                                    />
                                </Button>
                                <Text style={styles.divisor} />
                                <Text style={styles.modalMessage}>
                                    Tem certeza que deseja remover este
                                    dependente?
                                </Text>
                                <Button
                                    full
                                    style={styles.modalButton}
                                    onPress={() => this.handleClose(true)}
                                >
                                    <Text>CONFIRMAR</Text>
                                </Button>
                                <Button
                                    full
                                    style={styles.modalButton}
                                    onPress={() => this.handleClose(false)}
                                >
                                    <Text>CANCELAR</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export { FamilyMemberDeleteModal };
