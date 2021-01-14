import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Container, Content, Footer, Button, Text } from 'native-base';
import { DPSFormQuestionItemComponent } from './dps-form-item-component';
import { navigationConfig } from '../register-screens';

import styles from './style';

const typesForm = {
    financialResponsible: 'Responsável Financeiro',
    holder: 'Titular',
    dependent: 'Dependente'
};


class DPSFormComponent extends Component {

    state = {
        buttonDisabled: true
    }

    buttons = {
        "step1": "Próximo",
        "step2": "Enviar"
    };

    constructor(props){
        super(props);
        this.state.buttonDisabled = this.setupButtonDisabled();
    }

    componentDidMount() {
        this.props.fetchDPSFormQuestion();

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: typesForm[this.props.typeForm]
                }
            }
        })
    }

    handleSaveDPSForm(step) {
        const { typeForm } = this.props;
        if (step === "step1") {
            Navigation.push(this.props.componentId, {
                component: {
                    ...navigationConfig.dpsForm,
                    passProps: {
                        step: "step2",
                        typeForm: typeForm
                    }
                }
            });
        } else {
            if (typeForm === 'dependent') {
                this.props.addDependentInFamilyMembers();
            } else if (typeForm === 'financialResponsible') {
                this.props.updateHolder(this.props.order.financialResponsible, this.props.typeForm);
                this.props.completeBeneficiaryForm(typeForm);
            } else{
                this.props.completeBeneficiaryForm(typeForm);
            }

            Navigation.push(this.props.componentId, {
                component: {
                    ...navigationConfig.success,
                    passProps: {
                        from: typeForm
                    }
                }
            });
        }
    }

    handleAnswerQuestion = (questionId, answer) => {
        const { typeForm } = this.props;
        this.props.updateAnswerDPSForm(typeForm, questionId, answer);
        this.setState({buttonDisabled: this.setupButtonDisabled()});
    }

    setupButtonDisabled = () => {
        const { questions, totalQuestions, order, typeForm, step = 'step1' } = this.props;
        const answers = order[typeForm] && order[typeForm].dpsAnswers;

        let buttonDisabled = true;
        if ((step === 'step1' && answers && Object.keys(answers).length >= questions[step].length) ||
            (step === 'step2' && answers && Object.keys(answers).length === totalQuestions) ) {
            buttonDisabled = false;
        }

        return buttonDisabled;
    }

    renderFooterButton(step) {
        return (
            <Button
                full
                rounded
                disabled={this.state.buttonDisabled}
                style={[styles.footerButton, this.state.buttonDisabled && styles.buttonDisabled]}
                onPress={() => this.handleSaveDPSForm(step)}>
                <Text>{this.buttons[step]}</Text>
            </Button>
        );
    }

    render() {
        const { step = "step1", order, typeForm } = this.props;
        const answers = order[typeForm] && order[typeForm].dpsAnswers || {};

        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Text style={styles.formTitle}>Formulário DPS - Parte {step === "step1" ? 1 : 2} de 2</Text>
                    {this.props.questions[step].map((question, index) => (
                        <DPSFormQuestionItemComponent
                            key={index}
                            {...question}
                            answer={answers[question.id]}
                            onChecked={this.handleAnswerQuestion} />
                    ))}
                </Content>
                <Footer style={styles.footer}>
                    {this.renderFooterButton(step)}
                </Footer>
            </Container>
        );
    }
}

export { DPSFormComponent };
