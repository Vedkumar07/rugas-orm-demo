import { useState } from "react";
import { UserListed } from "../Component/userListed"; 
import { UserListing } from "../Component/userListing"; 

export function UserPage() {
  const [state, setState] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="flex space-x-6 mb-8">
        <button
          className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition"
          onClick={() => setState(false)}
        >
          User Listed
        </button>
        <button
          className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition"
          onClick={() => setState(true)}
        >
          User Listing
        </button>
      </div>

      <div className="w-full max-w-4xl">{state ? <UserListing /> : <UserListed />}</div>
    </div>
  );
}
