import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProductListed() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromCookies = () => {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key.trim().toLowerCase() === "token") return decodeURIComponent(value);
      }
      return null;
    };

    const token = getTokenFromCookies();
    console.log("Tokenadmin:", token);
    if (!token) {
      console.error("No token found, authentication required.");
      return;
    }

    fetch("https://rugas-orm-demo-ajii.onrender.com/product/productBulk", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.productBulk) {
          console.log("Products loaded:", data.productBulk); 
          setProducts(Array.isArray(data.productBulk) ? data.productBulk : []);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleBuyProduct = (productId) => {
    console.log("Selected Product ID:", productId);
    
    if (!productId) {
      console.error("No product ID provided");
      alert("Unable to process purchase: Missing product information");
      return;
    }
    let token = localStorage.getItem('TOKENS');
    if (!token) {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key.trim() === "TOKENS") {
          token = decodeURIComponent(value);
          break;
        }
      }
    }
    
    console.log("Token for purchase:", token);
  
    if (!token) {
      console.error("No token found, authentication required.");
      alert("You need to log in to purchase products.");
      navigate("/login");
      return;
    }
  
    fetch("https://rugas-orm-demo-ajii.onrender.com/user/buy", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Purchase successful!");
          navigate("/Purchese");
        } else {
          console.error("Purchase failed:", data.error || "Unknown error");
          navigate("/Purchese");
        }
      })
      .catch((error) => {
        console.error("Error purchasing product:", error);
        alert("Error purchasing product. Please try again.");
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.length === 0 ? (
        <p className="text-gray-400 col-span-3 text-center">No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product._id || index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={product.pictures || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-indigo-600 font-bold text-lg mt-2">${product.price}</p>
              <div className="mt-2 text-xs text-gray-500">Product ID: {product._id}</div>
              <button
                onClick={() => handleBuyProduct(product._id)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
                disabled={!product._id}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}