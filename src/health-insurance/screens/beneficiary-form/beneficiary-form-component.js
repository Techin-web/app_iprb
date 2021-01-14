import React from 'react';
import { Container } from 'native-base';
import { withAlertErrorComponent } from '../../components';
import { FormComponent1 } from './forms/form-component-1';
import { FormComponent2 } from './forms/form-component-2';
import { UploadDocumentForm } from './forms/upload-document-form';
import styles from './style';

class BeneficiaryFormScreen extends React.Component {

    componentDidMount(){
        this.props.fetchState();
        this.props.resetAutocompleteFields();
    }

    render() {
        const { step = "step1", typeForm } = this.props;
        let nextPage;
        switch (typeForm) {
            case 'financialResponsible':
                nextPage = 'beneficiaryForm';
                break;
            case 'holder':
                nextPage = 'beneficiaryFormHolder'
                break;
            case 'dependent':
                nextPage = 'beneficiaryFormDependencies';
                break;
        }
        return (
            <Container style={styles.container}>
                {
                    step === "step1" &&
                        <FormComponent1 { ...this.props } nextPage={nextPage}/>
                }
                {
                    step === "step2" &&
                        <FormComponent2 { ...this.props } nextPage={nextPage}/>
                }
                {
                    step === "step3" &&
                        <UploadDocumentForm { ...this.props } nextPage={nextPage}/>
                }
            </Container>
        );
    }
}

const BeneficiaryFormScreenComponent = withAlertErrorComponent(BeneficiaryFormScreen);
export { BeneficiaryFormScreenComponent };
