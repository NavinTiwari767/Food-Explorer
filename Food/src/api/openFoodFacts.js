import axios from 'axios';

const API_BASE = 'https://world.openfoodfacts.org';

export const getProductsByCategory = async (category, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE}/cgi/search.pl`, {
      params: {
        tagtype_0: 'categories',
        tag_contains_0: 'contains',
        tag_0: category,
        json: 1,
        page,
        page_size: 24 // Number of products per page
      }
    });
    return {
      products: response.data.products || [],
      count: response.data.count || 0
    };
  } catch (error) {
    console.error('Error fetching category products:', error);
    return { products: [], count: 0 };
  }
};

export const searchProducts = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE}/cgi/search.pl`, {
      params: {
        search_terms: query,
        json: 1,
        page,
        page_size: 24
      }
    });
    return {
      products: response.data.products || [],
      count: response.data.count || 0
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return { products: [], count: 0 };
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_BASE}/api/v0/product/${barcode}.json`);
    return { product: response.data.product || null };
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    return { product: null };
  }
};

export const getCategories = async () => {
  return [
    'beverages', 'dairy', 'snacks', 'cereals',
    'fruits', 'vegetables', 'meats', 'fishes',
    'chocolates', 'biscuits', 'breads', 'spreads'
  ];
};