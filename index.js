import { Navigation } from "react-native-navigation";
import { registerRootNavigation } from "./src/root-navigation";

Navigation.events().registerAppLaunchedListener(() => {
    registerRootNavigation();
});
