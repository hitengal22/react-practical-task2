import { legacy_createStore as createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducers } from '../redux/reducers';

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore(initialState) {
  return createStore(persistedReducer, initialState);
}
