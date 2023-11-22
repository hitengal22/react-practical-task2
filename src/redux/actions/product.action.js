import * as constants from '../constants/product.constants';


export const addNewProduct = (payload) => ({
  type: constants.ADD_NEW_PRODUCT,
  payload
});

export const updateProductDetail = (payload) => ({
  type: constants.UPDATE_PRODUCT_DETAIL,
  payload
});

export const deleteProductDetail = (payload) => ({
  type: constants.DELETE_PRODUCT,
  payload
});

export const deleteMultipleRecords = (payload) => ({
  type: constants.DELETE_MULTIPLE_RECORDS,
  payload
})