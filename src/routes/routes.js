import { ROUTE_PATH } from '../utils/constant';
import NewProduct from '../pages/product/new';
import Products from '../pages/product';

export const Router = [
  {
    path: ROUTE_PATH.HOME,
    element: <Products />
  },
  {
    path: ROUTE_PATH.NEW_PRODUCT,
    element: <NewProduct />
  }
];