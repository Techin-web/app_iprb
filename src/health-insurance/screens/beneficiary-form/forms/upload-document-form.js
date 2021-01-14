import React, { useState } from "react";
import { Alert } from "react-native";
import ImageResizer from "react-native-image-resizer";
import ImagePicker from "react-native-image-picker";
import { Navigation } from "react-native-navigation";
import {
    Footer,
    Text,
    Button,
    Icon,
    Content,
    View,
    Spinner,
} from "native-base";
import { TextDivisor } from "../../../components";
import { navigationConfig } from "../../register-screens";

import styles from "../style";

export const UploadDocumentForm = (props) => {
    const [upload, setUpload] = useState(false);
    const [changedPhotos, setChangedPhotos] = useState(false);

    const showError = (message = "Erro ao fazer upload, tente novamente!") => {
        Alert.alert("Erro", message, [{ text: "OK" }], { cancelable: true });
    };

    const handleSelectDocument = (documentType) => {
        ImagePicker.showImagePicker(
            {
                quality: 0.6,
                title: "Selecione uma foto",
                cancelButtonTitle: "Cancelar",
                takePhotoButtonTitle: "Tirar foto",
                chooseFromLibraryButtonTitle: "Escolher da biblioteca",
            },
            (response) => {
                if (!response.uri) {
                    return;
                }

                if (response.fileSize > 300000) {
                    const width = parseInt(response.width / 2);
                    const height = parseInt(response.height / 2);

                    ImageResizer.createResizedImage(
                        response.uri,
                        width,
                        height,
                        "JPEG",
                        60
                    )
                        .then((r) => {
                            props.updateDocumentBeneficiaryForm(
                                props.typeForm,
                                documentType,
                                r.uri
                            );
                            setChangedPhotos(true);
                        })
                        .catch((err) => {
                            showError(err.toString());
                        });
                } else {
                    props.updateDocumentBeneficiaryForm(
                        props.typeForm,
                        documentType,
                        response.uri
                    );
                    setChangedPhotos(true);
                }
            }
        );
    };

    const hasDocument = (type) => {
        const { typeForm, order } = props;
        const { documents = {} } = order;
        const cpf = order[typeForm].cpf;
        return documents[cpf] && documents[cpf][type];
    };

    const hasAllDocuments = () => {
        const { typeForm, order } = props;
        const { documents = {} } = order;
        const cpf = order[typeForm].cpf;
        const docs = documents[cpf];
        return docs && docs.cpf && docs.contracheque && docs.comprovante;
    };

    const renderButtonIcon = (type) => {
        return hasDocument(type) ? (
            <Icon
                ios="ios-checkmark"
                android="md-checkmark"
                style={styles.textSelected}
            />
        ) : (
            <Icon ios="ios-add" android="md-add" />
        );
    };

    const isLastStep =
        props.typeForm == "financialResponsible" &&
        !props.order.financialResponsible.holder;
    const invalidDocuments = !hasAllDocuments();

    const nextScreen = () => {
        if (
            props.typeForm == "financialResponsible" &&
            !props.order.financialResponsible.holder
        ) {
            Navigation.push(props.componentId, {
                component: {
                    ...navigationConfig.success,
                    passProps: {
                        from: props.typeForm,
                    },
                },
            });

            props.completeBeneficiaryForm(props.typeForm);
        } else {
            Navigation.push(props.componentId, {
                component: {
                    ...navigationConfig.dpsForm,
                    passProps: {
                        typeForm: props.typeForm,
                    },
                },
            });
        }
    };

    const goToNextScreen = () => {
        const { typeForm, order } = props;
        const { documents = {} } = order;
        const cpf = order[typeForm].cpf;
        const docs = documents[cpf];

        if (changedPhotos) {
            setUpload(true);
            props
                .uploadDocuments(typeForm, docs)
                .then((success) => {
                    if (success) {
                        setUpload(false);
                        setChangedPhotos(false);
                        nextScreen();
                    } else {
                        setUpload(false);
                        showError();
                    }
                })
                .catch((e) => {
                    setUpload(false);
                    showError();
                });
        } else {
            nextScreen();
        }
    };

    if (upload) {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    flex: 1,
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner color={styles.primaryColor.color} />
                <Text>Enviando arquivos..</Text>
            </View>
        );
    }

    return (
        <>
            <Content>
                <TextDivisor text="Para finalizar o preenchimento do formulário, envie-nos as imagens dos seguintes documentos" />
                <Button
                    full
                    bordered
                    iconRight
                    onPress={() => handleSelectDocument("contracheque")}
                    style={[
                        styles.button,
                        hasDocument("contracheque")
                            ? styles.buttonSelected
                            : null,
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            hasDocument("contracheque")
                                ? styles.textSelected
                                : null,
                        ]}
                    >
                        Contracheque
                    </Text>
                    {renderButtonIcon("contracheque")}
                </Button>
                <Button
                    full
                    bordered
                    iconRight
                    onPress={() => handleSelectDocument("cpf")}
                    style={[
                        styles.button,
                        hasDocument("cpf") ? styles.buttonSelected : null,
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            hasDocument("cpf") ? styles.textSelected : null,
                        ]}
                    >
                        CPF/RG
                    </Text>
                    {renderButtonIcon("cpf")}
                </Button>
                <Button
                    full
                    bordered
                    iconRight
                    onPress={() => handleSelectDocument("comprovante")}
                    style={[
                        styles.button,
                        hasDocument("comprovante")
                            ? styles.buttonSelected
                            : null,
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            hasDocument("comprovante")
                                ? styles.textSelected
                                : null,
                        ]}
                    >
                        Comprovante de Residência
                    </Text>
                    {renderButtonIcon("comprovante")}
                </Button>
            </Content>
            <Footer style={styles.footer}>
                <Button
                    full
                    rounded
                    style={[
                        styles.footerButton,
                        invalidDocuments ? styles.buttonDisabled : null,
                    ]}
                    disabled={!hasAllDocuments()}
                    onPress={() => {
                        goToNextScreen();
                    }}
                >
                    <Text>{isLastStep ? "FINALIZAR" : "PRÓXIMO"}</Text>
                </Button>
            </Footer>
        </>
    );
};
