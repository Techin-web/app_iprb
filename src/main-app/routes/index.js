import * as screens from "../screens";
import App from "../App";

import { Navigation } from "react-native-navigation";

const navigationName = {
    app: "tech.in.main.app",
    signIn: "tech.in.main.signIn",
    signUp: "tech.in.main.signUp",
    forgotPassword: "tech.in.main.forgotPassword",
    chat: "tech.in.main.chat",
    bottomTabs: "tech.in.main.bottomTabs",
    topTabs: "tech.in.main.topTabs",
    cardSolicitation: "tech.in.main.cardSolicitation",
    cardRecharge: "tech.in.main.cardRecharge",
    toosegurosMaisCuidado: "tech.in.main.toosegurosMaisCuidado",
    toosegurosResidencial: "tech.in.main.toosegurosResidencial",
    axaTelemedicina: "tech.in.main.axaTelemedicina",
    paymentScreen: "tech.in.main.paymentScreen",
    paymentSuccessScreen: "tech.in.main.paymentSuccessScreen",
    toosegurosMoto: "tech.in.main.toosegurosMoto",
    healthInsuranceTerms: "tech.in.main.healthInsuranceTerms",
    bible: "tech.in.main.bible",
    hymns: "tech.in.main.hymns",
    mural: "tech.in.main.mural",
    muralDetails: "tech.in.main.muralDetails",
    churchMap: "tech.in.main.churchMap",
    churchMapDetails: "tech.in.main.churchMapDetails",
    medias: "tech.in.main.medias",
    mediasAlbum: "tech.in.main.mediasAlbum",
    mediasDetails: "tech.in.main.mediasDetails",
    editProfile: "tech.in.main.editProfile",
};

const registerScreens = () => {
    Navigation.registerComponent(navigationName.app, () => App);

    Navigation.registerComponent(navigationName.signIn, () => screens.SignIn);

    Navigation.registerComponent(navigationName.signUp, () => screens.SignUp);

    Navigation.registerComponent(
        navigationName.forgotPassword,
        () => screens.ForgotPassword
    );

    Navigation.registerComponent(navigationName.bible, () => screens.Bible);

    Navigation.registerComponent(
        navigationName.churchMap,
        () => screens.ChurchMap
    );

    Navigation.registerComponent(
        navigationName.churchMapDetails,
        () => screens.ChurchMapDetails
    );

    Navigation.registerComponent(navigationName.hymns, () => screens.Hymns);

    Navigation.registerComponent(navigationName.medias, () => screens.Medias);

    Navigation.registerComponent(
        navigationName.mediasAlbum,
        () => screens.MediasAlbum
    );

    Navigation.registerComponent(
        navigationName.mediasDetails,
        () => screens.MediaDetails
    );

    Navigation.registerComponent(navigationName.chat, () => screens.Chat);

    Navigation.registerComponent(
        navigationName.bottomTabs,
        () => screens.BottomTabs
    );

    Navigation.registerComponent(navigationName.topTabs, () => screens.TopTabs);

    Navigation.registerComponent(
        navigationName.cardSolicitation,
        () => screens.CardSolicitation
    );

    Navigation.registerComponent(
        navigationName.cardRecharge,
        () => screens.CardRecharge
    );

    Navigation.registerComponent(
        navigationName.toosegurosMaisCuidado,
        () => screens.ToosegurosMaisCuidado
    );

    Navigation.registerComponent(
        navigationName.toosegurosResidencial,
        () => screens.ToosegurosResidencial
    );

    Navigation.registerComponent(
        navigationName.axaTelemedicina,
        () => screens.AxaTelemedicina
    );

    Navigation.registerComponent(
        navigationName.paymentScreen,
        () => screens.PaymentScreen
    );

    Navigation.registerComponent(
        navigationName.paymentSuccessScreen,
        () => screens.PaymentSuccessScreen,
    );

    Navigation.registerComponent(
        navigationName.toosegurosMoto,
        () => screens.ToosegurosMoto
    );

    Navigation.registerComponent(
        navigationName.healthInsuranceTerms,
        () => screens.HealthInsuranceTerms
    );

    Navigation.registerComponent(
        navigationName.editProfile,
        () => screens.EditProfile
    );

    Navigation.registerComponent(navigationName.mural, () => screens.Mural);

    Navigation.registerComponent(
        navigationName.muralDetails,
        () => screens.MuralDetails
    );
};

export { navigationName, registerScreens };
