import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden max-w-xs sm:max-w-sm md:max-w-md mr-6 sm:mr-0"> {/* Added mr-4 for mobile, reset on sm */}
      <Link to={`/product/${product.code}`} className="flex flex-col h-full">
        {/* Image Section */}
        <div className="h-56 sm:h-64 bg-gray-100 border-b border-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src={product.image_url || "/placeholder-food.png"}
            alt={product.product_name || "Product"}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = "/placeholder-food.png";
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.product_name || "Unknown Product"}
          </h3>

          {/* Bottom Row */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span className="text-gray-600 capitalize truncate">
              {product.categories_hierarchy?.[0]
                ?.split(":")
                .pop()
                .replace(/-/g, " ") || "Uncategorized"}
            </span>

            {product.nutrition_grades && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow
                  ${
                    product.nutrition_grades === "a"
                      ? "bg-green-600"
                      : product.nutrition_grades === "b"
                      ? "bg-teal-600"
                      : product.nutrition_grades === "c"
                      ? "bg-yellow-600"
                      : product.nutrition_grades === "d"
                      ? "bg-orange-600"
                      : "bg-red-600"
                  }`}
              >
                {product.nutrition_grades.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;