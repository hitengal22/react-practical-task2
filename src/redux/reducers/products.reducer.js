import * as constants from '../constants/product.constants';

const initialState = {
  products: []
};

function getProductDetail (products, productId) {
  const allProducts = products;
  return allProducts?.find((p) => p?.id === productId);
}

function deleteProduct (products, productId) {
  const allProducts = products;
  return allProducts?.filter((p) => p?.id !== productId);
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_PRODUCTS:
      return state;
    case constants.ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          action?.payload
        ]
      };
    case constants.GET_PRODUCT_DETAIL:
      return getProductDetail(state?.products, action?.payload);
    case constants.DELETE_PRODUCT:
      return {
        products: deleteProduct(state?.products, action.payload)
      }
    default:
      return state;
  }
};
