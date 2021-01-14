import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore as persistStoreRaw, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';


//TODO: put some expiration to reducers ...

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export const restoreStore = store => new Promise((resolve) => {
    persistStoreRaw(store, undefined, () => {
      resolve();
    });
});

export const store = createStore(
    persistReducer(persistConfig, reducers),
    applyMiddleware(thunk, logger)
);
