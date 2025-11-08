import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="
        group
        bg-white rounded-2xl shadow-sm border border-gray-100
        hover:shadow-lg hover:border-amber-300
        transition-all duration-300 ease-in-out
        overflow-hidden flex flex-col
      "
    >
      <div className="w-full h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.image_url || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-2 capitalize">
          🏷️ {product.category || "Uncategorized"}
        </p>

        {product.ingredients.length > 0 && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            <span className="font-medium text-gray-700">Ingredients:</span>{" "}
            {product.ingredients.slice(0, 3).join(", ")}...
          </p>
        )}

        <div className="mt-auto">
          <p className="inline-block bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
            Nutrition Grade: {product.nutrition_grade.toUpperCase()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
