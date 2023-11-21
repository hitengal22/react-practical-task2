import { Link } from "react-router-dom";
import Button from "./Button";
import { ROUTE_PATH } from "../utils/constant";

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  console.log(props)
  return (
    <div className="flex items-center gap-2">
        <Link to={`${ROUTE_PATH.VIEW_PRODUCT_LINK}/${props?.data?.id}`}><Button title={`Edit`} /></Link>
        <Button title={`Delete`} onClick={() => { if (window?.confirm("Are you sure you want to delete this product?")) { props?.onDelete(props?.data?.id) } }} className={`bg-red-600`} />
    </div>
  );
};
