import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import BasicLayout from "../../component/BasicLayout";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/constant";
import Button from "../../component/Button";
import TableCategoryField from "../../component/TableCategoryField";
import TableActionField from "../../component/TableActionField";
import * as actions from "../../redux/actions/product.action";
const Products = () => {
  const gridRef = useRef();
  const products = useSelector((state) => state?.products?.products);
  const dispatch = useDispatch();

  // delete single item
  const deleteProductItem = (productId) => {
    dispatch(actions.deleteProductDetail(productId));
  };


  // define cols
  const colDef = useMemo(
    () => [
      { field: "id", checkboxSelection: true, headerCheckboxSelection: true },
      { field: "name" },
      { field: "category", cellRenderer: TableCategoryField },
      { field: "expiryDate" },
      { field: "costPrice" },
      { field: "sellPrice" },
      { field: "discount", headerName: "Discount (in %)" },
      { field: "discountSellPrice", headerName: "Disconted Sell Price" },
      { field: "finalPrice" },
      {
        field: "action",
        cellRenderer: TableActionField,
        cellRendererParams: {
          onDelete: deleteProductItem,
        },
      },
    ],
    []
  );

  // for quick filter across all field (it may not work in cellRenderer as it will check from APIs value)
  const onQuickFilterChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("quickFilter").value
    );
  }, []);

  
  // function to delete multiple records
  const deleteMultipleRecords = () => {
    const rows = gridRef.current.api.getSelectedRows();
    
    if (rows.length > 0) {
      if (window?.confirm("Are you sure you want to delete multiple records?")) {
        dispatch(actions.deleteMultipleRecords(rows))
      }
    }
  }

  return (
    <BasicLayout>
      <div className="text-right my-3">
        <Link to={ROUTE_PATH.NEW_PRODUCT}>
          <Button title={`Add New Product`} />
        </Link>
      </div>
      <div style={{ marginBottom: "5px", gap: '5px' }}>
        <Button title={`Delete Selected`} className={`bg-red-500 mr-3`} onClick={deleteMultipleRecords}/>
        <input
          type="text"
          onInput={onQuickFilterChanged}
          id="quickFilter"
          className="border border-grey-300 p-2 rounded"
          placeholder="quick filter..."
        />
      </div>
      <div className="ag-theme-balham" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowHeight={50}
          rowData={products}
          columnDefs={colDef}
          rowSelection={'multiple'}
          defaultColDef={{
            editable: false,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
        />
      </div>
    </BasicLayout>
  );
};

export default Products;
