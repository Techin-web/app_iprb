import React from 'react';
import Pdf from 'react-native-pdf';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Container, ListItem, CheckBox, Text, Content, Button } from 'native-base';
import { TextDivisor } from '../../components';
import { navigationConfig } from '../register-screens';
import { BASE_URL } from '../../services';

import styles from './style';

const baseURL = BASE_URL.replace('/api', '');

class AcceptanceTermComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accept: false
        };
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'dismiss') {
            Navigation.dismissModal(navigationConfig.termModal.id);
        }
    }

    handleClickCloseModal = (id) => {
        if(!this.state.accept){
            Alert.alert(
                "Aviso",
                "Aceite os termos de uso para prosseguir.",
                [{text: "OK"}]
            );
            return;
        }

        this.props.setAcceptanceTerm(id);
        Navigation.dismissModal(navigationConfig.termModal.id);
    }

    handleClickAcceptanceTerms = (accept) => {
        this.setState({ accept });
    }

    render() {
        const { healthInsuranceSelected = {} } = this.props;
        const { accept } = this.state;

        const source = {
            uri: `${baseURL}/termo/${healthInsuranceSelected.id}`,
            cache: true
        };
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Pdf
                        source={source}
                        style={styles.pdf} />
                    <TextDivisor
                        text='' />
                    <ListItem
                        button
                        onPress={()=>{this.handleClickAcceptanceTerms(!accept)}}>
                        <CheckBox
                            onPress={()=>{this.handleClickAcceptanceTerms(!accept)}}
                            checked={accept}
                            color='#4055B3' />
                        <Text style={styles.text}>Aceitos os Termos de Uso e Politica de Privacidade</Text>
                    </ListItem>
                    <Button
                        full
                        style={[styles.button]}
                        onPress={() => this.handleClickCloseModal(healthInsuranceSelected.id)}  >
                        <Text>CONTINUAR</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export { AcceptanceTermComponent };
