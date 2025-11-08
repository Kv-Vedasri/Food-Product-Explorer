import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ProductDetails } from '../types/ProductDetails';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        const details = await api.getProductByBarcode(id);
        setProduct(details);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Product Not Found</h2>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-400 to-orange-400 py-6 px-8 text-white">
          <h1 className="text-4xl font-extrabold">{product.name}</h1>
          <p className="text-sm opacity-90 mt-2">Detailed nutritional and ingredient info</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="rounded-xl shadow-md w-full max-w-md object-cover"
            />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Product Overview</h2>
              <p className="text-gray-600 mb-1"><strong>Category:</strong> {product.category || 'N/A'}</p>
              <p className="text-gray-600">
                <strong>Nutrition Grade:</strong>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-md text-white font-semibold ${
                    product.nutrition_grade === 'a'
                      ? 'bg-green-500'
                      : product.nutrition_grade === 'b'
                      ? 'bg-lime-500'
                      : product.nutrition_grade === 'c'
                      ? 'bg-yellow-500'
                      : product.nutrition_grade === 'd'
                      ? 'bg-orange-500'
                      : 'bg-red-500'
                  }`}
                >
                  {product.nutrition_grade.toUpperCase()}
                </span>
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🧂 Ingredients</h3>
              {product.ingredients?.length ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Ingredients not available.</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🍎 Nutritional Values (per 100g)</h3>
              <ul className="grid grid-cols-2 gap-x-4 text-gray-700">
                <li>⚡ Energy: {product.nutriments.energy_100g || 'N/A'} kcal</li>
                <li>🥑 Fat: {product.nutriments.fat_100g || 'N/A'} g</li>
                <li>🍞 Carbs: {product.nutriments.carbohydrates_100g || 'N/A'} g</li>
                <li>🥩 Proteins: {product.nutriments.proteins_100g || 'N/A'} g</li>
              </ul>
            </div>

            {/* Labels */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🏷️ Labels</h3>
              {product.labels?.length ? (
                <div className="flex flex-wrap gap-2">
                  {product.labels.map((label, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No special labels.</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center pb-6">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
