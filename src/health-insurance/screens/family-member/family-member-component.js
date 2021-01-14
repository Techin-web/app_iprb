import React, { Component } from "react";
import { View } from "react-native";
import { Navigation } from "react-native-navigation";
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
    Body,
    Button,
} from "native-base";
import { TextDivisor } from "../../components";
import { navigationConfig } from "../register-screens";
import { FamilyMemberDeleteModal } from "./family-member-delete-modal";
import Icon from "react-native-vector-icons/dist/Octicons";
import styles from "./style";

const familyMemberDataOptions = {
    1: "Filho(a)",
    2: "Cônjugue",
};

class FamilyMemberComponent extends Component {
    state = {
        modalVisible: false,
    };

    handleModalClose = (index, remove) => {
        //TODO: remove member from store
        if (remove) {
            this.props.removeDependentInFamilyMembers(index);
        }
        this.setState({
            modalVisible: false,
            member: false,
            index: false,
        });
    };

    handleClickDelete = (member, index) => {
        this.setState({ modalVisible: true, member, index });
    };

    getFamilyMember = (member) => {
        return familyMemberDataOptions[member];
    };

    editFamilyMember = (member, index) => {
        this.props.editDependentInFamilyMembers(member, index);
        Navigation.push(this.props.componentId, {
            component: navigationConfig.beneficiaryFormDependencies,
        });
    };

    render() {
        const { familyMembers } = this.props.order;

        return (
            <Container style={styles.container}>
                <Content>
                    <FamilyMemberDeleteModal
                        index={this.state.index}
                        member={this.state.member}
                        onClose={this.handleModalClose}
                        modalVisible={this.state.modalVisible}
                    />
                    <Text style={styles.contenTitle}>
                        Para adicionar novo dependente ou remover dependente já
                        adicionado clique nas opções abaixo
                    </Text>

                    <TextDivisor />
                    {familyMembers && !familyMembers.length && (
                        <Text style={styles.contentCenter}>
                            Nenhum dependente cadastrado.
                        </Text>
                    )}

                    {familyMembers &&
                        familyMembers.map((member, index) => (
                            <Card key={index}>
                                <CardItem
                                    button
                                    onPress={() => {
                                        this.editFamilyMember(member, index);
                                    }}
                                >
                                    <View style={styles.cardView}>
                                        <Text style={styles.cardContentTitle}>
                                            Dependente
                                        </Text>
                                        <Text style={styles.cardContentBody}>
                                            {member.name}
                                        </Text>
                                        <Text style={styles.cardContentTitle}>
                                            Grau Parentesco
                                        </Text>
                                        <Text style={styles.cardContentBody}>
                                            {this.getFamilyMember(
                                                member.familyMember
                                            )}
                                        </Text>
                                        <Text style={styles.cardContentTitle}>
                                            CPF
                                        </Text>
                                        <Text style={styles.cardContentBody}>
                                            {member.cpf}
                                        </Text>
                                        <Button
                                            transparent
                                            style={styles.buttonClose}
                                            onPress={() =>
                                                this.handleClickDelete(
                                                    member,
                                                    index
                                                )
                                            }
                                        >
                                            <Icon
                                                name="trashcan"
                                                style={styles.closeIcon}
                                            />
                                        </Button>
                                    </View>
                                </CardItem>
                            </Card>
                        ))}

                    <Button
                        full
                        bordered
                        iconRight
                        style={styles.button}
                        onPress={() => {
                            if (
                                typeof this.props.order.dependentEditId !==
                                "undefined"
                            ) {
                                this.props.removeDependentEditId();
                            }
                            Navigation.push(this.props.componentId, {
                                component:
                                    navigationConfig.beneficiaryFormDependencies,
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Adicionar dependente
                        </Text>
                        <Icon style={styles.buttonIcon} name="plus" />
                    </Button>
                </Content>
            </Container>
        );
    }
}

export { FamilyMemberComponent };
