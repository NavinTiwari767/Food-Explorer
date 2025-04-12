import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { getProductsByCategory, searchProducts, getProductByBarcode } from '../api/openFoodFacts';

const Home = () => {
  const {
    products, setProducts,
    filters, setFilters,
    loading, setLoading,
    pagination, setPagination,
    sortProducts
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (filters.barcode) {
        const response = await getProductByBarcode(filters.barcode);
        setProducts(response.product ? [response.product] : []);
        if (response.product) {
          navigate(`/product/${filters.barcode}`);
        }
      } else if (filters.category) {
        data = await getProductsByCategory(filters.category, pagination.page);
        setProducts(prev => pagination.page === 1 ? data.products : [...prev, ...(data.products || [])]);
      } else {
        data = await searchProducts(filters.searchQuery || '', pagination.page);
        setProducts(prev => pagination.page === 1 ? data.products : [...prev, ...(data.products || [])]);
      }
      setPagination(prev => ({ ...prev, hasMore: data.products?.length > 0 }));
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPagination(prev => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {loading && pagination.page === 1 ? (
          <div className="text-center py-12">Loading products...</div>
        ) : products?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products found. Try a different search or category.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortProducts(products, filters.sortBy, filters.sortOrder)
                .filter(product => product && product.product_name)
                .map(product => (
                  <ProductCard key={product.code || product.id} product={product} />
              ))}
            </div>

            {pagination.hasMore && (
              <div className="text-center mt-8">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;