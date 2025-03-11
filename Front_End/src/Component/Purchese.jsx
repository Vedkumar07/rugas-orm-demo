import { useEffect, useState } from "react";

export function Purchese() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTokenFromCookies = () => {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key.trim() === "TOKENS") return decodeURIComponent(value);
      }
      return null;
    };
  
    const token = getTokenFromCookies();
    console.log("Token:", token);

    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    fetch("https://rugas-orm-demo-ajii.onrender.com/user/boughtProduct", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Purchased products data:", data);
        if (data.productDetail) {
          setProducts(Array.isArray(data.productDetail) ? data.productDetail : [data.productDetail]);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching purchased products:", err);
        setError("Failed to load purchased products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading your purchased products...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.length === 0 ? (
        <p className="text-gray-400 col-span-3 text-center">No purchased products found.</p>
      ) : (
        products.map((product, index) => (
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
            </div>
          </div>
        ))
      )}
    </div>
  );
}