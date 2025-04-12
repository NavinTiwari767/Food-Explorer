const NutritionLabel = ({ product }) => {
    if (!product.nutriments) return <p>No nutritional information available</p>;
  
    const nutritionData = [
      { label: 'Energy', value: `${Math.round(product.nutriments.energy || 0)} kcal`, dailyPercent: product.nutriments.energy_value },
      { label: 'Fat', value: `${Math.round(product.nutriments.fat || 0)}g`, dailyPercent: product.nutriments.fat_value },
      { label: 'Saturated Fat', value: `${Math.round(product.nutriments['saturated-fat'] || 0)}g`, dailyPercent: product.nutriments['saturated-fat_value'] },
      { label: 'Carbohydrates', value: `${Math.round(product.nutriments.carbohydrates || 0)}g`, dailyPercent: product.nutriments.carbohydrates_value },
      { label: 'Sugars', value: `${Math.round(product.nutriments.sugars || 0)}g`, dailyPercent: product.nutriments.sugars_value },
      { label: 'Protein', value: `${Math.round(product.nutriments.proteins || 0)}g`, dailyPercent: product.nutriments.proteins_value },
      { label: 'Salt', value: `${Math.round(product.nutriments.salt || 0)}g`, dailyPercent: product.nutriments.salt_value },
    ];
  
    return (
      <div className="border-2 border-black p-2 max-w-xs">
        <h3 className="text-center font-bold border-b-2 border-black mb-1">Nutrition Facts</h3>
        <div className="text-xs">
          <div className="flex justify-between border-b border-black py-1">
            <span>Serving Size: {product.serving_size || '100g'}</span>
          </div>
          
          <div className="text-center font-bold border-b-4 border-black py-1">
            Amount Per Serving
          </div>
          
          {nutritionData.map((item, index) => (
            <div key={index} className="flex justify-between border-b border-gray-400 py-1">
              <span className="font-semibold">{item.label}</span>
              <span>{item.value}</span>
              {item.dailyPercent && (
                <span>{Math.round(item.dailyPercent)}%</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default NutritionLabel;