import { useCallback, useEffect, useReducer, useState } from "react";
import BasicLayout from "../../component/BasicLayout";
import { ROUTE_PATH, categories } from "../../utils/constant";
import Button from "../../component/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions/product.action";

const ViewProduct = () => {
  const products = useSelector((state) => state?.products?.products);
  const { id } = useParams();
  const product = products?.find((p) => p?.id == id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   initlized two seperate useState to manipute it with useEffect hooks
  const [sellPrice, setSellPrice] = useState(product?.sellPrice || 0);
  const [discount, setDiscount] = useState(product?.discount || 0);

  const [data, setData] = useReducer(
    (next, prev) => {
      return { ...next, ...prev };
    },
    {
      ...product, // set already existing data
    }
  );

  //   handle change event for all event type
  const handleChange = (event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;

    setData({ [name]: value });

    if (name === "sellPrice") {
      setSellPrice(value);
    } else if (name === "discount") {
      setDiscount(value);
    }
  };

  //   form submit handler redirect back after storing record in 
  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      const payload = {
        ...data,
      };
      dispatch(action.updateProductDetail(payload));
      navigate(ROUTE_PATH.HOME);
    },
    [data]
  );

  useEffect(() => {
    handleCalculateDiscount();
  }, [sellPrice, discount]);

  const handleCalculateDiscount = useCallback(() => {
    const discountedPrice =
      discount > 0 ? ((sellPrice || 0) / 100) * (discount || 1) : 0;
    const finalPrice = (sellPrice || 0) - discountedPrice;

    setData({
      discountSellPrice: Number(discountedPrice).toFixed(2),
      finalPrice: Number(finalPrice).toFixed(2),
    });
  }, [sellPrice, discount]);
  return (
    <>
      <BasicLayout>
        <div className="flex justify-between">
          <h2>Update Product</h2>
          <Link to={ROUTE_PATH.HOME}>
            <Button title={`Back`} />
          </Link>
        </div>
        <form method="POST" action="#" onSubmit={submitHandler}>
          <div className="px-10 grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="label">Name</label>
              <input
                type="text"
                className="rounded-md py-1 px-2 border"
                name="name"
                value={data?.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Category</label>
              <select
                name="category"
                onChange={handleChange}
                className="rounded-md py-1 px-2 border"
              >
                <option value={``}>Select any category</option>
                {categories?.map((category) => (
                  <option
                    value={category?.id}
                    key={category?.id}
                    selected={category?.id === data?.category}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Description</label>
              <textarea
                className="rounded-md py-1 px-2 border"
                name="description"
                value={data?.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                className="rounded-md py-1 px-2 border"
                value={data?.expiryDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Cost Price</label>
              <input
                type="number"
                name="costPrice"
                className="rounded-md py-1 px-2 border"
                value={data?.costPrice}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Sell Price</label>
              <input
                type="number"
                name="sellPrice"
                className="rounded-md py-1 px-2 border"
                value={data?.sellPrice}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                className="rounded-md py-1 px-2 border"
                value={data?.discount}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Discounted Sell Price</label>
              <input
                type="number"
                name="discountSellPrice"
                className="rounded-md py-1 px-2 border"
                value={data?.discountSellPrice}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label>Final Price</label>
              <input
                type="number"
                name="finalPrice"
                className="rounded-md py-1 px-2 border"
                value={data?.finalPrice}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div>
              <Button title={`Update`} />
            </div>
          </div>
        </form>
      </BasicLayout>
    </>
  );
};

export default ViewProduct;
