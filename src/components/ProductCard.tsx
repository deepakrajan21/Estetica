
import React from "react";
import { Plus } from "lucide-react";

interface ProductCardProps {
  name: string;
  image: string;
}

const onAdd=()=>{

}

const ProductCard: React.FC<ProductCardProps> = ({ name, image }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md p-4 flex flex-col items-center transition group w-56 h-48">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-contain mb-2 rounded-lg"
      />
       <button
          onClick={onAdd}
          className="absolute rounded-2xl inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Plus className="w-4 h-4 text-blue-600" />
          </div>
        </button>
      <p className="w-28 text-center font-medium line-clamp-2 text-[16]">{name}</p>
    </div>
  );
};

export default ProductCard;
