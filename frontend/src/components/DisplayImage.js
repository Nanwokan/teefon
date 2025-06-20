import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';


const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoClose />
        </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} className=" max-w-lg w-full h-full max-h-lg" />
        </div>
      </div>
    </div>
  );
};

DisplayImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default DisplayImage;
