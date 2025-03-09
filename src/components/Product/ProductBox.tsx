import React from 'react';

interface ProductBoxProps {
  imageSrc: string;
  title: string;
  originalPrice: string;
  discountPrice: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({ imageSrc, title, originalPrice, discountPrice }) => {
  return (
    <div className="border-4 border-[#d84444] rounded-lg p-4 w-[561px] h-[188px]">
      <div className="relative flex">
      <img
          alt={`Product image of ${title}`}
          className="w-full h-[150px] w-[150px] object-contain rounded-lg" // Adjust width and height
          src={imageSrc}
        />
        <div className="p-2 w-2/3">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-red-500 text-xs">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-gray-500 line-through text-xs">{originalPrice}</span>
            <span className="text-red-500 text-lg font-bold ml-2">{discountPrice}</span>
          </div>
        </div>
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          SALE
        </span>
      </div>
    </div>
  );
};

export default ProductBox;
