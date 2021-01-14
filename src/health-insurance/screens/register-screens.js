import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import {
    MainScreen,
    HealthInsuranceListScreen,
    AcceptanceTermScreen,
    HealthInsuranceDetailScreen,
    HealthInsuranceValueScreen,
    ProviderScreen,
    ProviderDetailScreen,
    QuoteBuyScreen,
    DPSFormScreen,
    SuccessScreen,
    BeneficiaryFormScreen,
    FamilyMemberListScreen,
    OccupationAutocompleteScreen,
    PaymentScreen,
} from "./index";

const navigationName = {
    main: "tech.in.MainScreen",
    healthInsuranceList: "tech.in.HealthInsuranceListScreen",
    acceptanceTerm: "tech.in.AcceptanceTerm",
    healthInsuranceDetail: "tech.in.HealthInsuranceDetailScreen",
    healthInsuranceValue: "tech.in.HealthInsuranceValueScreen",
    provider: "tech.in.ProviderScreen",
    providerDetail: "tech.in.ProviderDetailScreen",
    quoteBuy: "tech.in.QuoteBuyScreen",
    dpsForm: "tech.in.DPSFormScreen",
    success: "tech.in.SuccessScreen",
    beneficiaryForm: "tech.in.BeneficiaryFormScreen",
    familyMemberList: "tech.in.FamilyMemberListScreen",
    occupationAutocompleteModal: "tech.in.OccupationAutoCompleteModal",
    payment: "tech.in.PaymentScreen",
};

const navigationConfig = {
    main: {
        name: navigationName.main,
        options: {},
    },
    healthInsuranceList: {
        name: navigationName.healthInsuranceList,
        options: {
            topBar: {
                title: {
                    text: "Seleção do Produto",
                },
            },
        },
    },
    healthInsuranceDetail: {
        id: navigationName.healthInsuranceDetail,
        name: navigationName.healthInsuranceDetail,
        options: {
            topBar: {
                title: {
                    text: "Plano de saúde",
                },
            },
        },
    },
    healthInsuranceValue: {
        name: navigationName.healthInsuranceValue,
        options: {
            topBar: {
                title: {
                    text: "Valores e planos",
                },
            },
        },
    },
    acceptanceTerm: {
        name: navigationName.acceptanceTerm,
        options: {},
    },
    provider: {
        name: navigationName.provider,
        options: {
            topBar: {
                title: {
                    text: "Rede credenciada",
                },
            },
        },
    },
    providerDetail: {
        name: navigationName.providerDetail,
        options: {
            topBar: {
                title: {
                    text: "Rede credenciada",
                },
            },
        },
    },
    quoteBuy: {
        id: navigationName.quoteBuy,
        name: navigationName.quoteBuy,
        options: {
            topBar: {
                title: {
                    text: "Simular e Comprar",
                },
            },
        },
    },
    dpsForm: {
        name: navigationName.dpsForm,
        options: {
            topBar: {
                title: {
                    text: "",
                },
            },
        },
    },
    success: {
        name: navigationName.success,
        options: {
            topBar: {
                visible: false,
            },
        },
    },
    beneficiaryForm: {
        name: navigationName.beneficiaryForm,
        options: {
            topBar: {
                title: {
                    text: "Responsável financeiro",
                },
            },
        },
        passProps: {
            typeForm: "financialResponsible",
            textTop:
                "Preencha os dados abaixo para adicionar o responsável financeiro.",
        },
    },
    beneficiaryFormHolder: {
        name: navigationName.beneficiaryForm,
        options: {
            topBar: {
                title: {
                    text: "Adicionar títular",
                },
            },
        },
        passProps: {
            typeForm: "holder",
            textTop:
                "Preencha os dados abaixo para adicionar o títular do plano de saúde.",
        },
    },
    beneficiaryFormDependencies: {
        name: navigationName.beneficiaryForm,
        options: {
            topBar: {
                title: {
                    text: "Adicionar dependente",
                },
            },
        },
        passProps: {
            typeForm: "dependent",
            textTop:
                "Preencha os dados abaixo para adicionar dependente do plano de saúde.",
        },
    },
    termModal: {
        id: "termModal",
        name: navigationName.acceptanceTerm,
        options: {
            modalPresentationStyle: "overFullScreen",
            topBar: {
                title: {
                    text: "Termos de Uso",
                },
                leftButtons: {
                    id: "dismiss",
                    icon: require("../assets/cancel.png"),
                },
            },
        },
    },
    familyMemberList: {
        id: navigationName.familyMemberList,
        name: navigationName.familyMemberList,
        options: {
            topBar: {
                title: {
                    text: "Dependentes",
                },
            },
        },
    },
    occupationAutocompleteModal: {
        id: "occupationAutocompleteModal",
        name: navigationName.occupationAutocompleteModal,
        options: {
            modalPresentationStyle: "overFullScreen",
            topBar: {
                title: {
                    text: "Escolha a profissão",
                },
                leftButtons: {
                    id: "dismiss",
                    icon: require("../assets/cancel.png"),
                },
            },
        },
    },
    payment: {
        name: navigationName.payment,
        options: {
            topBar: {
                title: {
                    text: "Confirmar código",
                },
            },
        },
    },
};

const registerScreens = (store) => {
    Navigation.registerComponentWithRedux(
        navigationConfig.main.name,
        () => MainScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.healthInsuranceList.name,
        () => HealthInsuranceListScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.acceptanceTerm.name,
        () => AcceptanceTermScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.healthInsuranceDetail.name,
        () => HealthInsuranceDetailScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.healthInsuranceValue.name,
        () => HealthInsuranceValueScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.provider.name,
        () => ProviderScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.providerDetail.name,
        () => ProviderDetailScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.quoteBuy.name,
        () => QuoteBuyScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.dpsForm.name,
        () => DPSFormScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.success.name,
        () => SuccessScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.beneficiaryForm.name,
        () => BeneficiaryFormScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.familyMemberList.name,
        () => FamilyMemberListScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.occupationAutocompleteModal.name,
        () => OccupationAutocompleteScreen,
        Provider,
        store
    );

    Navigation.registerComponentWithRedux(
        navigationConfig.payment.name,
        () => PaymentScreen,
        Provider,
        store
    );
};

export { navigationName, navigationConfig, registerScreens };
