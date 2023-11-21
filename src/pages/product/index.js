import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import BasicLayout from '../../component/BasicLayout';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '../../utils/constant';

const Products = () => {
  const products = useSelector((state) => state?.products?.products);
  console.log('products', products);
  const colDef = useMemo(
    () => [
      { field: 'id' },
      { field: 'name' },
      { field: 'category' },
      { field: 'price' },
      { field: 'discontPrice' },
      { field: 'totalPrice' },
      { field: 'action' }
    ],
    []
  );
  return (
    <BasicLayout>
      <div className='text-right my-3'>
        <Link to={ROUTE_PATH.NEW_PRODUCT}><button className='py-2 px-3 rounded-lg bg-blue-600 text-white '>Add New Product</button></Link>
      </div>
      <div className='ag-theme-balham' style={{ height: 600, width: '100%' }}>
        <AgGridReact rowData={products} columnDefs={colDef} />
      </div>
    </BasicLayout>
  );
};

export default Products;
