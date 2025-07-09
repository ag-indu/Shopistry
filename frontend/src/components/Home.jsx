import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return (
      <h2 className="text-center py-40 text-2xl font-semibold text-red-500">
        Something went wrong...
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-20">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          <div>
            <h5 className="text-lg font-bold text-gray-800 mb-1">
              {product.name.toUpperCase()}
            </h5>
            <p className="text-sm italic text-gray-500 mb-2">
              by {product.brand}
            </p>
          </div>

          <hr className="my-3 border-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-green-600 font-semibold text-lg">
              ₹{product.price}
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
