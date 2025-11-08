import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../services/api";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortSelect from "../components/SortSelect";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async (reset: boolean = false) => {
      setIsLoading(true);
      setError(null);
      try {
        const newProducts = await api.getProducts(
          reset ? 1 : page,
          20,
          selectedCategory,
          sortBy
        );
        if (reset) {
          setProducts(newProducts);
          setPage(2);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setPage((prevPage) => prevPage + 1);
        }
        setHasMore(newProducts.length > 0);
      } catch (error) {
        setError("⚠️ Failed to fetch products. Try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [page, selectedCategory, sortBy]
  );

  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await api.getCategories();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const searchResults = await api.searchProducts(query);
      setProducts(searchResults);
      setHasMore(false);
    } catch (error) {
      setError("⚠️ Error searching products. Please try again later.");
      console.error("Error searching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 px-6 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 drop-shadow-sm">
          🍱 Food Product Explorer
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Explore delicious food items from around the world 🌎
        </p>
      </header>

      {/* Filters & Search Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <SortSelect onSortChange={handleSortChange} />
      </div>

      {error && (
        <div className="text-center text-red-500 bg-red-100 border border-red-200 p-3 rounded-lg mb-6 w-fit mx-auto">
          {error}
        </div>
      )}

      <InfiniteScroll
        dataLength={products.length}
        next={() => fetchProducts(false)}
        hasMore={hasMore}
        loader={<h4 className="text-center text-gray-500 mt-4">Loading...</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>

      {isLoading && (
        <div className="text-center mt-6 text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default HomePage;
