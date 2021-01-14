import React, { Component } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import KeyboardAwareScrollView from "../../../../components/KeyboardAwareScrollView";
import ToosegurosLogo from "../../../../assets/tooseguros-logo.png";
import Input from "../../../../components/Input";
import MaskedInput from "../../../../components/MaskedInput";
import Button from "../../../../components/Button";

import styles from "./styles";

class Moto extends Component {
    state = {
        formData: {
            name: "",
            cpf: "",
            email: "",
            phone: "",
            birth: "",
            motoPlate: "",
            motoYear: "",
            motoModel: "",
            motoFabricator: "",
        },
    };

    onChangedInputHandler = (value, attribute) => {
        const { formData } = { ...this.state };

        formData[attribute] = value;

        this.setState(formData);
    };

    render() {
        const { formData } = { ...this.state };

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
                        <Text style={styles.LabelText}>Dados do cliente</Text>
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
                            Os dados abaixo você pega no documento da moto - CRV
                        </Text>
                        <Input
                            placeholder="PLACA*"
                            dense
                            small
                            value={formData.motoPlate}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "motoPlate")
                            }
                        />
                        <Input
                            placeholder="ANO*"
                            dense
                            small
                            value={formData.motoYear}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "motoYear")
                            }
                        />
                        <Input
                            placeholder="MODELO*"
                            dense
                            small
                            value={formData.motoModel}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(text, "motoModel")
                            }
                        />
                        <Input
                            placeholder="FABRICANTE*"
                            dense
                            small
                            value={formData.motoFabricator}
                            onChangeText={(text) =>
                                this.onChangedInputHandler(
                                    text,
                                    "motoFabricator"
                                )
                            }
                        />
                        <View style={styles.ButtonHolder}>
                            <Button title="Enviar" bold dark />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

Moto.options = {
    topBar: {
        title: {
            text: "Too Seguros | Moto",
        },
    },
};

export default Moto;
