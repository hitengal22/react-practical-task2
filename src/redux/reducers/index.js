import { combineReducers } from 'redux';
import { productReducer } from './products.reducer';

export const reducers = combineReducers({
  products: productReducer
});