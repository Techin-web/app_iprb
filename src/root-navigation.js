import { Navigation } from "react-native-navigation";
import { store, restoreStore } from "./health-insurance/store";
import { registerScreens as registerHealthInsuranceScreens } from "./health-insurance/screens/register-screens";
import { registerScreens as registerMainAppScreens } from "./main-app/routes";

async function bootstrap() {
    registerMainAppScreens();
    registerHealthInsuranceScreens(store);
    await restoreStore(store);
}

async function registerRootNavigation() {
    await bootstrap();

    Navigation.setDefaultOptions({
        topBar: {
            title: {
                color: "#4055B3",
            },
            backButton: {
                color: "#4055B3",
                showTitle: false,
            },
        },
    });

    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: "tech.in.main.app",
                        },
                    },
                ],
            },
        },
    });
}

export { registerRootNavigation };
