import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { filters, setFilters } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('product');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setFilters({
      ...filters,
      searchQuery: searchType === 'product' ? search : '',
      barcode: searchType === 'barcode' ? search : '',
      page: 1,
    });
    navigate('/');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar, isSidebarOpen:', !isSidebarOpen); // Debug log
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg border-b border-gray-200 text-white relative z-50">
      {/* Top Nav with Search and Hamburger */}
      <div className="px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="flex-1 flex items-center gap-2 sm:gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-1/3 sm:w-auto"
          >
            <option value="product">Product Name</option>
            <option value="barcode">Barcode</option>
          </select>
          <input
            type="text"
            placeholder={searchType === 'barcode' ? 'Enter barcode...' : 'Search product...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            className="px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-128 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-gray-900 px-3 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-yellow-500 transition duration-300 font-medium text-sm sm:text-base"
          >
            Search
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="ml-2 sm:ml-4 text-2xl md:hidden text-white hover:text-gray-200 transition focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:flex md:justify-center md:static absolute left-0 top-full bg-white text-gray-800 border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block z-50 bg-red-500`} // Temporary red background for debugging
      >
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 px-4 py-3 max-w-7xl mx-auto">
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="breakfasts">Breakfasts</option>
          </select>

          <select
            value={filters.nutritionGrade || ''}
            onChange={(e) => updateFilter('nutritionGrade', e.target.value)}
            className="bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="">Nutrition Grade</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
          </select>

          <select
            value={filters.diet || ''}
            onChange={(e) => updateFilter('diet', e.target.value)}
            className="bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="">Dietary Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>

          <select
            value={filters.sortOrder || 'asc'}
            onChange={(e) => updateFilter('sortOrder', e.target.value)}
            className="bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;