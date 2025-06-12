import { useCallback, useContext, useEffect, useState } from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import displayINRCurrency from '../helpers/displayCurrency';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);

    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
  };

  console.log('data', data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);

      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log('coordinate', left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate('/cart');
  };

  return (
    <div className="container mx-auto my-2 rounded p-4 bg-white">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/**product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 flex justify-center items-center relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down"
              alt="Produit"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute overflow-hidden min-w-[500px] min-h-[400px] bg-white p-1 -right-[510px] top-0 border">
                <div
                  className="w-full h-full min-w-[500px] min-h-[400px] scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={'loadingImage' + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageURL) => {
                  return (
                    <div
                      className="h-20 w-20 bg-custom-dark bg-opacity-10 rounded p-1"
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                        onClick={() => handleMouseEnterProduct(imageURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/**product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 lg:h-8 w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 animate-pulse h-6 lg:h-8 min-w-[100px] w-full"></p>

            <div className="bg-slate-200 animate-pulse flex items-center h-6 lg:h-8 gap-1 w-full"></div>
            <div className="flex items-center gap-2 text-1xl h-6 lg:h-8 animate-pulse lg:text-2xl font-medium my-1">
              <p className="bg-slate-200 animate-pulse "></p>
              <p className="bg-slate-200 animate-pulse "></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="border-2 bg-slate-200 animate-pulse rounded h-6 lg:h-8 w-full"></button>
              <button className="border-2 bg-slate-200 animate-pulse rounded h-6 lg:h-8 w-full "></button>
            </div>
            <div>
              <p className="bg-slate-200 animate-pulse font-medium my-1 h-6 lg:h-8"></p>
              <p className="bg-slate-200 animate-pulse font-medium my-1 h-8 lg:h-10"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-custom-third-color bg-opacity-30 text-custom-third-color px-2 rounded-full w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-1xl lg:text-2xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Acheter
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  hover:text-red-600 font-medium bg-red-600 text-white hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Ajouter au Panier
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={'Produits recommandés...'}
        />
      )}
    </div>
  );
};

export default ProductDetails;
