import { useCallback, useReducer } from 'react';
import BasicLayout from '../../component/BasicLayout';

const NewProduct = () => {
  const [data, setData] = useReducer(
    (next, prev) => {
      return { ...next, ...prev };
    },
    {
      name: null,
      category: null,
      description: null,
      expiryData: null,
      costPrice: null,
      sellPrice: null,
      discount: null,
      discountSellPrice: null,
      finalPrice: null
    }
  );
  const submitHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleChange = (event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;

    setData({ [name]: value });
  };

  return (
    <BasicLayout>
      <form method='POST' action='#' onSubmit={submitHandler}>
        <div className='px-10 grid grid-cols-3'>
          <div className='flex flex-col'>
            <label className='label'>Name</label>
            <input
              type='text'
              className='rounded-md py-1 px-2 border'
              name='name'
              value={data?.name}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col'>
            <label>Category</label>
            <select className='rounded-md py-1 px-2 border'>
              <option value={``}>Select any category</option>
              
            </select>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};

export default NewProduct;
