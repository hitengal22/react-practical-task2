import * as constants from '../constants/product.constants';

export const getAllProducts = (payload) => ({
  type: constants.GET_ALL_PRODUCTS,
  payload
});

export const addNewProduct = (payload) => ({
  type: constants.ADD_NEW_PRODUCT,
  payload
});

export const getProductDetail = (payload) => ({
  type: constants.GET_PRODUCT_DETAIL,
  payload
});

export const deleteProductDetail = (payload) => ({
  type: constants.DELETE_PRODUCT,
  payload
});