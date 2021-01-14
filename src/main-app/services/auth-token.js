import AsyncStorage from '@react-native-community/async-storage';

export const TOKEN_KEY = '@onenet-mobile-token-iprb';

export const isAuthenticated = async () =>
  (await AsyncStorage.getItem(TOKEN_KEY)) !== null;

export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY);

export const login = async token => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};
