import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <h2 className="text-center text-xl font-semibold pt-40">Loading...</h2>
    );
  }

  return (
    <div className="pt-24 px-6"> {/* this pt-24 prevents overlap with fixed navbar */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <img
            className="w-full h-[400px] object-cover rounded-lg"
            src={imageUrl}
            alt={product.imageName}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              {product.name}
            </h1>
            <h5 className="text-lg text-blue-600 italic mt-1">
              {product.brand}
            </h5>
            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6 border-t pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                ₹ {product.price}
              </span>
              <button
                className={`px-5 py-2 rounded-md text-white transition font-semibold ${
                  product.productAvailable
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handlAddToCart}
                disabled={!product.productAvailable}
              >
                {product.productAvailable ? "Add to cart" : "Out of Stock"}
              </button>
            </div>

            <h6 className="text-sm text-gray-700">
              Stock Available:{" "}
              <span className="font-bold text-green-500">
                {product.stockQuantity}
              </span>
            </h6>

            <div>
              <h6 className="text-sm text-gray-500">Product listed on:</h6>
              <p className="text-sm text-gray-600 italic">
                {new Date(product.releaseDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
                type="button"
                onClick={handleEditClick}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                type="button"
                onClick={deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
