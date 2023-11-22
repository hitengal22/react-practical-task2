import { categories } from "../utils/constant";

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const categoryName = categories.find((category) => category?.id === cellValue)

  return <span>{categoryName?.name}</span>;
};
