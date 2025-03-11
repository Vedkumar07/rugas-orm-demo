import { useState } from "react";
import { ProductListing } from "../Component/ProductListing";
import { ProductListed } from "../Component/ProductListed";

export function ProductPage() {
  const [state, setState] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="flex space-x-6 mb-8">
        <button
          className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition"
          onClick={() => setState(false)}
        >
          Product Listing
        </button>
        <button
          className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition"
          onClick={() => setState(true)}
        >
          Product Listed
        </button>
      </div>

      <div className="w-full max-w-4xl">{state ? <ProductListed /> : <ProductListing />}</div>
    </div>
  );
}
