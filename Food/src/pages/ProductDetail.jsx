import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getProductByBarcode } from '../api/openFoodFacts';
import NutritionLabel from '../components/NutritionLabel';

const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setFilters } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductByBarcode(barcode);
        if (response.product) {
          setProduct(response.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      setFilters(prev => ({ ...prev, barcode: '' }));
    };
  }, [barcode, setFilters]);

  if (loading) return <div className="text-center py-16 text-blue-600 font-medium animate-pulse">Loading product details...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-16">Product not found</div>;

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative"> {/* Added relative positioning for the close button */}
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors rounded-full w-10 h-10 flex items-center justify-center bg-white shadow-md hover:bg-gray-100"
          >
            <span className="text-2xl font-bold">×</span>
          </button>

          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3 p-6 bg-gray-50 flex items-center justify-center">
              <img
                src={product.image_url || '/placeholder-food.png'}
                alt={product.product_name}
                className="max-h-72 object-contain rounded-lg shadow-md"
                onError={(e) => {
                  e.target.src = '/placeholder-food.png';
                }}
              />
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name || 'Unnamed Product'}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  {product.brands && (
                    <span className="bg-gray-200 text-sm px-4 py-1 rounded-full text-gray-700 font-medium">
                      Brand: {product.brands.split(',').join(', ')}
                    </span>
                  )}
                  {product.nutrition_grades && (
                    <span
                      className={`text-white text-sm font-medium px-4 py-1 rounded-full shadow-md
                        ${
                          product.nutrition_grades === 'a'
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : product.nutrition_grades === 'b'
                            ? 'bg-gradient-to-r from-teal-400 to-teal-600'
                            : product.nutrition_grades === 'c'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                            : product.nutrition_grades === 'd'
                            ? 'bg-gradient-to-r from-orange-400 to-orange-600'
                            : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                    >
                      Grade: {product.nutrition_grades.toUpperCase()}
                    </span>
                  )}
                  {product.labels_tags?.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                      {product.labels_tags.join(', ').replace(/-/g, ' ')}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h2>
                <p className="text-gray-700 whitespace-pre-line text-base">
                  {product.ingredients_text || 'No ingredients information available.'}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Nutritional Information</h2>
                <NutritionLabel product={product} />
              </div>

              {product.allergens && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-1">⚠ Allergens:</h3>
                  <p className="text-yellow-700 text-base">{product.allergens || 'No known allergens'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;