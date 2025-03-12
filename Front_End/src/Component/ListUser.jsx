import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserListed() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check for admin token first (named "TOKEN")
        let adminToken = null;
        let userToken = null;
        
        // Check cookies for both types of tokens
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
          const [key, value] = cookie.split("=");
          // Admin token (from your first file, it's lowercase "token")
          if (key.trim().toLowerCase() === "token") {
            adminToken = decodeURIComponent(value);
          }
          // User token (from your second file, it's "TOKENS")
          if (key === "TOKENS") {
            userToken = decodeURIComponent(value);
          }
        }
        
        // Also check localStorage for user token
        if (!userToken) {
          userToken = localStorage.getItem('TOKENS');
        }
        
        console.log("Admin Token:", adminToken);
        console.log("User Token:", userToken);
        
        // Use admin token preferentially if available, otherwise use user token
        const tokenToUse = adminToken || userToken;
        console.log("token:",tokenToUse);

        if (!tokenToUse) {
          console.error("No token found, authentication required.");
          alert("Authentication required. Please log in.");
          navigate("/auth");
          return;
        }

        const response = await fetch("https://rugas-orm-demo-2bsk-git-main-ved-kumars-projects-b373e65a.vercel.app/user/getUser", {
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
            navigate("/auth");
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