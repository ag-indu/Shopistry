import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product ID:", product.id, error);
              return { ...product, imageUrl: "/placeholder.jpg" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="text-center py-40 text-xl font-semibold text-red-600">
        Something went wrong...
      </h2>
    );
  }

  return (
    <div className="pt-24 px-6"> {/* 🟡 Space from top to avoid navbar overlap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length === 0 ? (
          <h2 className="col-span-full text-center text-gray-600 text-xl">
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } = product;

            return (
              <div
                key={id}
                className={`relative flex flex-col rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] ${
                  productAvailable ? "bg-white" : "bg-gray-200"
                }`}
              >
                <Link to={`/product/${id}`} className="h-full flex flex-col">
                  {/* Image container with fixed ratio */}
                  <div className="relative w-full pt-[56.25%] bg-gray-100 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    {/* Heart Button */}
                    <div className="absolute top-3 right-3 z-10 text-gray-600 hover:text-red-500 cursor-pointer">
                      <i className="bi bi-heart text-xl"></i>
                    </div>
                  </div>

                  <div className="flex-grow p-4 flex flex-col justify-between">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 mb-1">
                        {name.toUpperCase()}
                      </h5>
                      <p className="text-sm italic text-gray-500">~ {brand}</p>
                    </div>

                    <div className="mt-4">
                      <p className="text-lg font-bold text-green-700 mb-2">
                        ₹ {price}
                      </p>
                      <button
                        className={`w-full py-2 px-4 text-white rounded-md text-sm font-medium transition ${
                          productAvailable
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!productAvailable}
                      >
                        {productAvailable ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
