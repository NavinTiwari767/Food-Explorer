import { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, _setFilters] = useState({
    category: '',
    searchQuery: '',
    barcode: '',
    sortBy: 'name',
    sortOrder: 'asc',
    nutritionGrade: '',
    diet: '', // Changed from dietaryPreferences to match your Navbar
    page: 1 // Added page to filters for better synchronization
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    hasMore: true
  });

  // Wrapped setFilters to ensure proper state updates
  const setFilters = useCallback((newFilters) => {
    _setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset page to 1 when filters change (except page itself)
      page: newFilters.page !== undefined ? newFilters.page : 1
    }));
    
    // Also update pagination page if it's changed
    if (newFilters.page !== undefined) {
      setPagination(prev => ({ ...prev, page: newFilters.page }));
    }
  }, []);

  const sortProducts = useCallback((products, sortBy = 'name', sortOrder = 'asc') => {
    if (!products) return [];
    
    return [...products].sort((a, b) => {
      // Handle undefined/null cases
      if (!a || !b) return 0;
      
      // Get values for comparison
      const valA = sortBy === 'name' 
        ? a.product_name?.toLowerCase() || '' 
        : sortBy === 'nutritionGrade' 
          ? a.nutrition_grades?.toLowerCase() || 'z' 
          : sortBy === 'calories'
            ? a.nutriments?.energy_value || 0
            : 0;
      
      const valB = sortBy === 'name' 
        ? b.product_name?.toLowerCase() || '' 
        : sortBy === 'nutritionGrade' 
          ? b.nutrition_grades?.toLowerCase() || 'z' 
          : sortBy === 'calories'
            ? b.nutriments?.energy_value || 0
            : 0;

      // Numeric comparison for calories
      if (sortBy === 'calories') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      
      // String comparison for other fields
      return sortOrder === 'asc' 
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, []);

  return (
    <AppContext.Provider value={{
      products, setProducts,
      loading, setLoading,
      error, setError,
      filters, setFilters, // Using the wrapped version
      pagination, setPagination,
      sortProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};