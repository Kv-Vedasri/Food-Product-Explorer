import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full max-w-sm">
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="
          w-full
          px-4 py-3
          rounded-xl
          border border-gray-300
          bg-white
          text-gray-700
          text-base
          shadow-sm
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300
          hover:border-gray-400
        "
      >
        <option value="" className="capitalize">All Categories</option>
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="capitalize text-gray-700"
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
