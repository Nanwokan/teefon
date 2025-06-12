import { useEffect, useState } from 'react';

// Import des images desktop
import { default as image1, default as image4, default as image5 } from '../assets/banner/Blue Modern Furniture Banner .png';
import image3 from '../assets/banner/DALL·E 2024-12-09 17.57.33 - Design a banner showcasing a modern furniture set in a cozy, natural living room environment. Include a wooden dining table, chairs, and cabinets with.webp';
import image2 from '../assets/banner/image2.jpg';

// Import des images mobile
import { default as image1Mobile, default as image2Mobile, default as image3Mobile, default as image4Mobile, default as image5Mobile } from '../assets/banner/image1Mobile.webp';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-custom-dark bg-opacity-10 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/** Desktop et tablette */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((imageURL, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={index} // Utilisation de l'index comme clé
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageURL}
                alt={`Desktop Banner ${index}`}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        {/** Mobile */}
        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={index} // Utilisation de l'index comme clé
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageURL}
                alt={`Mobile Banner ${index}`}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
