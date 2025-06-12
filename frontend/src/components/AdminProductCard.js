import { useState } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import displayINRCurrency from '../helpers/displayCurrency';
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-2 rounded ">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            width={120}
            height={120}
            className="mx-auto object-fill h-full"
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className="w-fit ml-auto p-2 bg-green-100 rounded-full cursor-pointer hover:bg-green-600 hover:text-white"
            onClick={() => setEditProduct(true)}
          >
            <RiEdit2Fill />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

import PropTypes from 'prop-types';

AdminProductCard.propTypes = {
  data: PropTypes.shape({
    productImage: PropTypes.arrayOf(PropTypes.string),
    productName: PropTypes.string,
    sellingPrice: PropTypes.number,
  }).isRequired,
  fetchdata: PropTypes.func.isRequired,
};


export default AdminProductCard;
