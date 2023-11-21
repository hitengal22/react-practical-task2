import { useCallback, useEffect, useReducer, useState } from "react";
import BasicLayout from "../../component/BasicLayout";
import { ROUTE_PATH, categories } from "../../utils/constant";
import Button from "../../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as action from "../../redux/actions/product.action";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sellPrice, setSellPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [data, setData] = useReducer(
    (next, prev) => {
      return { ...next, ...prev };
    },
    {
      name: null,
      category: null,
      description: null,
      expiryDate: null,
      costPrice: null,
      sellPrice: null,
      discount: null,
      discountSellPrice: null,
      finalPrice: null,
    }
  );

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

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      const payload = {
        id: Math.round(Math.random() * 1000),
        ...data
      }
      dispatch(action.addNewProduct(payload));
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
    <BasicLayout>
      <div className="flex justify-between">
        <h2>Add New Product</h2>
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
                <option value={category?.id} key={category?.id}>
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

          <div className="">
            <Button title={`Submit`} />
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};

export default NewProduct;
