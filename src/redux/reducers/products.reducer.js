import * as constants from "../constants/product.constants";

const initialState = {
  products: [],
};

// update product 
function updateProductDetail(products, product) {
  const allProducts = products;
  return allProducts?.map((p) => {
    if (p?.id === product?.id) {
      return product;
    }

    return p;
  });
}

// delete multiple products from records
function deleteMultipleProducts(products, productsToDelete) {
  const productIds = productsToDelete?.map((p) => p?.id);
  return products
    ?.map((p) => {
      if (productIds?.includes(p?.id)) {
        return null;
      }
      return p;
    })
    ?.filter((r) => r !== null);
}

// delete single product
function deleteProduct(products, productId) {
  const allProducts = products;
  return allProducts?.filter((p) => p?.id !== productId);
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action?.payload],
      };
    case constants.UPDATE_PRODUCT_DETAIL:
      return {
        ...state,
        products: updateProductDetail(state?.products, action?.payload),
      };
    case constants.DELETE_PRODUCT:
      return {
        products: deleteProduct(state?.products, action.payload),
      };
    case constants.DELETE_MULTIPLE_RECORDS:
      return {
        products: deleteMultipleProducts(state?.products, action?.payload),
      };
    default:
      return state;
  }
};
