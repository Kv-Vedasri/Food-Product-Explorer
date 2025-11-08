import React from "react";

interface SortSelectProps {
  onSortChange: (sortBy: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ onSortChange }) => {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="
          w-full appearance-none
          px-4 py-2.5
          bg-white/80 backdrop-blur-sm
          border border-gray-200
          rounded-xl shadow-sm
          text-gray-800 text-sm md:text-base
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
          transition-all duration-300
          cursor-pointer
        "
      >
        <option value="">Sort by</option>
        <option value="name_asc">Name (A → Z)</option>
        <option value="name_desc">Name (Z → A)</option>
        <option value="grade_asc">Nutrition Grade (A → E)</option>
        <option value="grade_desc">Nutrition Grade (E → A)</option>
      </select>

      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        ▼
      </span>
    </div>
  );
};

export default SortSelect;
