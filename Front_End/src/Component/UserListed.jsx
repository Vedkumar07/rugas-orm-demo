import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserListed() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let adminToken = null;
        let userToken = null;
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key.trim().toLowerCase() === "token") {
            adminToken = decodeURIComponent(value);
          }
          if (key === "TOKENS") {
            userToken = decodeURIComponent(value);
          }
        }
        if (!userToken) {
          userToken = localStorage.getItem('TOKENS');
        }
        
        console.log("Admin Token:", adminToken);
        console.log("User Token:", userToken);
        const tokenToUse = adminToken || userToken;

        if (!tokenToUse) {
          console.error("No token found, authentication required.");
          alert("Authentication required. Please log in.");
          navigate("/login");
          return;
        }

        const response = await fetch("https://rugas-orm-demo-ajii.onrender.com/user/getUser", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${tokenToUse}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            console.error("Token might be expired or invalid.");
            alert("Your session has expired. Please log in again.");
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.userData) {
          setUsers(Array.isArray(data.userData) ? data.userData : []);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">User Listing</h2>
      
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="mb-2">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-gray-600"><span className="font-medium">Address:</span> {user.address}</p>
                <p className="text-gray-600"><span className="font-medium">Phone:</span> {user.phoneNumber}</p>
                <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
              </div>
              <button
                onClick={() => navigate('/ProductListed')}
                className="mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition w-full"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}