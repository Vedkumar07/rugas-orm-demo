import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProductListing() {

  const navigate=useNavigate();
  const[name,setName]=useState();
  const[category,setCategory]=useState();
  const[description,setDescription]=useState();
  const[pictures,setPictures]=useState();
  const[price,setPrice]=useState();
  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key.trim().toLowerCase() === "token") return decodeURIComponent(value);
  }
  return null;
};


  const handleClick = async (e) => {
    e.preventDefault(); 

    const token = getTokenFromCookies();  
    console.log("Extracted token:", token);

    if (!token) {
        console.error("No token found in cookies");
        return;
    }

    try {
        const response = await fetch("https://rugas-orm-demo-2bsk-git-main-ved-kumars-projects-b373e65a.vercel.app/product/add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                description,
                pictures,
                price
            })
        });

        const data = await response.json();
        console.log("Response:", data);

        if (response.ok && data.message === "Product added") {
            navigate("/ProductListed", { state: { response: data } });
            console.log("Product successfully added!");
        } else {
            console.error("API Error:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-white-900">
              name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm/6 font-medium text-white-900">
            category
            </label>
            <div className="mt-2">
              <input
                id="category"
                name="category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                autoComplete="category"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm/6 font-medium text-white-900">
            description
            </label>
            <div className="mt-2">
              <input
                id="description"
                name="description"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="description"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor=" pictures" className="block text-sm/6 font-medium text-white-900">
            pictures
            </label>
            <div className="mt-2">
              <input
                id="pictures"
                name="pictures"
                type="text"
                required
                value={pictures}
                onChange={(e) => setPictures(e.target.value)}
                autoComplete=" pictures"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm/6 font-medium text-white-900">
            price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="price"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleClick} // Pass the event here
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}