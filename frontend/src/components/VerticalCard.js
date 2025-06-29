import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import displayINRCurrency from '../helpers/displayCurrency';
import scrollTop from '../helpers/scrollTop';
import PropTypes from 'prop-types';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
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
        : data.map((product) => {
            return (
              <Link
                key={product._id}
                to={'/product/' + product?._id}
                className="w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[320px] bg-white rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48  min-w-[280px] md:min-w-[165px] p-2 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
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
  );
};

VerticalCard.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      productName: PropTypes.string,
      category: PropTypes.string,
      sellingPrice: PropTypes.number,
      price: PropTypes.number,
      productImage: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};


export default VerticalCard;
