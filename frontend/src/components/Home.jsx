import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = () => {
  const { data, isError, refreshData } = useContext(AppContext);
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
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/products");
          setProducts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [data]);

  if (isError) {
    return (
      <h2 className="text-center text-xl font-semibold mt-40">
        Something went wrong...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="block bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 min-h-72"
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <h5 className="text-lg font-bold text-gray-800 mb-1">
                {product.name.toUpperCase()}
              </h5>
              <span className="text-sm text-gray-500 italic">
                by {product.brand}
              </span>
            </div>
            <div className="mt-4">
              <h5 className="text-xl font-semibold text-green-600">
                ₹{product.price}
              </h5>
              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                onClick={(e) => e.preventDefault()}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
