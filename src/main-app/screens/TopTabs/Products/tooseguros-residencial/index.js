import React, { Component } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import Checkbox from "../../../../components/Checkbox";
import KeyboardAwareScrollView from "../../../../components/KeyboardAwareScrollView";
import ToosegurosLogo from "../../../../assets/tooseguros-logo.png";
import Input from "../../../../components/Input";
import MaskedInput from "../../../../components/MaskedInput";
import Button from "../../../../components/Button";

import styles from "./styles";

const construction_types = ["Alvenaria", "Madeira", "Mista"];

class Residencial extends Component {
    state = {
        formData: {
            name: "",
            cpf: "",
            email: "",
            phone: "",
            birth: "",
            constructionType: null,
        },
    };

    onChangedInputHandler = (value, attribute) => {
        const { formData } = { ...this.state };

        formData[attribute] = value;

        this.setState(formData);
    };

    onToggledCheckbox = (value) => {
        this.onChangedInputHandler(value, "constructionType");
    };

    render() {
        const { formData } = { ...this.state };

        const checkBoxValue0 = construction_types[0];
        const checkBoxValue1 = construction_types[1];
        const checkBoxValue2 = construction_types[2];

        return (
            <KeyboardAwareScrollView>
                <ScrollView style={styles.ScrollView}>
                    <View style={styles.Container}>
                        <Image
                            source={ToosegurosLogo}
                            style={styles.MainIcon}
                        />
                        <Text style={styles.Subtitle}>
                            Para concluir a venda, é necessário preencher o
                            formulário abaixo com os dados do comprador.
                        </Text>
                        <Input
                            placeholder="NOME COMPLETO*"
                            dense
                            small
                            value={formData.name}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "name")
                            }
                        />
                        <Input
                            placeholder="E-MAIL*"
                            dense
                            small
                            value={formData.email}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "email")
                            }
                        />
                        <MaskedInput
                            type="cpf"
                            placeholder="CPF*"
                            dense
                            small
                            value={formData.cpf}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "cpf")
                            }
                        />
                        <MaskedInput
                            type="cel-phone"
                            options={{
                                maskType: "BRL",
                                withDDD: true,
                                dddMask: "(99) ",
                            }}
                            placeholder="TELEFONE () -*"
                            dense
                            small
                            value={formData.phone}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "phone")
                            }
                        />
                        <MaskedInput
                            type={"datetime"}
                            options={{
                                format: "DD/MM/YYYY",
                            }}
                            placeholder="DATA DE NASCIMENTO*"
                            dense
                            small
                            value={formData.birth}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "birth")
                            }
                        />
                        <Text style={styles.LabelText}>
                            Qual o tipo da sua construção?
                        </Text>
                        <View style={styles.CheckBoxHolder}>
                            <Checkbox
                                label={checkBoxValue0}
                                pressed={() =>
                                    this.onToggledCheckbox(checkBoxValue0)
                                }
                                checked={
                                    checkBoxValue0 === formData.constructionType
                                }
                            />
                            <Checkbox
                                label={checkBoxValue1}
                                pressed={() =>
                                    this.onToggledCheckbox(checkBoxValue1)
                                }
                                checked={
                                    checkBoxValue1 === formData.constructionType
                                }
                            />
                            <Checkbox
                                label={checkBoxValue2}
                                pressed={() =>
                                    this.onToggledCheckbox(checkBoxValue2)
                                }
                                checked={
                                    checkBoxValue2 === formData.constructionType
                                }
                            />
                        </View>
                        <View style={styles.ButtonHolder}>
                            <Button title="Enviar" bold dark />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

Residencial.options = {
    topBar: {
        title: {
            text: "Too Seguros | Residencial",
        },
    },
};

export default Residencial;
