import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Image, Text, Alert } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { navigationConfig } from '../register-screens';
import { withAlertErrorComponent, TextDivisor } from '../../components';
import { BASE_URL } from '../../services';

import styles from './style';

const baseURL = BASE_URL.replace('/api', '');
class HealthInsuranceDetail extends React.Component {

    state = {
        nextScreen: false
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidAppear(){
        if(this.state.nextScreen && this.props.order.startedFill){
            Alert.alert('Alerta', 'Os dados serão perdidos ao voltar para tela anterior');
            this.setState({nextScreen: false});
        }
    }

    componentDidDisappear(){
        if(!this.state.nextScreen && this.props.order.startedFill){
            this.props.resetOrder();
        }
    }

    render() {
        const { healthInsuranceSelected } = this.props;
        return (
            <Container style={styles.container}>
                <Content>
                    <Image
                        source={{uri: `${baseURL}/logo/${healthInsuranceSelected.id}` }}
                        style={styles.image} />
                    <TextDivisor
                        text='Planos de saúde com valores acessíveis.' />
                    <Button
                        full
                        style={styles.button}
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: navigationConfig.provider
                            })
                        }} >
                        <Text style={styles.text}>REDE CREDENCIADA</Text>
                    </Button>
                    <Button
                        full
                        style={styles.button}
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: navigationConfig.healthInsuranceValue
                            })
                        }} >
                        <Text style={styles.text}>VALORES E PLANOS</Text>
                    </Button>
                    <Button
                        full
                        style={styles.button}
                        onPress={() => {
                            this.setState({nextScreen: true}, () =>
                                Navigation.push(this.props.componentId, {
                                    component: navigationConfig.quoteBuy
                                })
                            );
                        }} >
                        <Text style={styles.text}>SIMULAR E COMPRAR</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const HealthInsuranceDetailComponent = withAlertErrorComponent(HealthInsuranceDetail);
export { HealthInsuranceDetailComponent };
