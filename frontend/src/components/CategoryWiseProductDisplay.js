import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import displayINRCurrency from '../helpers/displayCurrency';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import scrollTop from '../helpers/scrollTop';
import PropTypes from 'prop-types';


const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((_, index) => {
              return (
                <div key={index} className="w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 h-48  min-w-[280px] md:min-w-[165px] p-2 flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 py-2 animate-pulse rounded-full"></h2>
                    <p className="bg-slate-200 rounded-full py-2 animate-pulse"></p>
                    <div className="flex gap-5">
                      <p className="bg-slate-200 rounded-full py-2 px-16 animate-pulse "></p>
                      <p className="bg-slate-200 rounded-full py-2 px-16 animate-pulse "></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-2 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link 
                  key={index}
                  to={'/product/' + product?._id}
                  className="w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] bg-white rounded-sm shadow "
                  onClick={scrollTop}
                >
                  <div className="bg-slate-200 h-48  min-w-[280px] md:min-w-[165px] p-2 flex justify-center items-center">
                    <img
                      src={product.productImage[0]}
                      className=" h-full hover:scale-105 transition-all mix-blend-multiple"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-400">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium text-ellipsis line-clamp-1">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-400 line-through text-ellipsis line-clamp-1">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full "
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Au Panier
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

CategoryWiseProductDisplay.propTypes = {
  category: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};


export default CategoryWiseProductDisplay;
