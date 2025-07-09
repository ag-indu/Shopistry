import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <h2 className="text-center text-xl font-semibold mt-40">
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6">
        <span className="text-sm text-gray-500 uppercase">{product.category}</span>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <h5 className="text-lg text-blue-600">{product.brand}</h5>
        <p className="mt-4 text-gray-600">{product.desc}</p>
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-green-600">
            ₹ {product.price}
          </span>
          <button
            className={`px-5 py-2 rounded-md text-white transition ${
              product.productAvailable
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!product.productAvailable}
          >
            {product.productAvailable ? "Add to cart" : "Out of Stock"}
          </button>
        </div>

        <h6 className="text-sm text-gray-700">
          Stock Available:{" "}
          <span className="font-bold text-green-500">{product.stockQuantity}</span>
        </h6>

        <div>
          <h6 className="text-sm text-gray-500">Product listed on:</h6>
          <p className="text-sm text-gray-600 italic">{product.releaseDate}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
            type="button"
          >
            Update
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
