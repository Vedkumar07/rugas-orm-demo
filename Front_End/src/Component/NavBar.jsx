import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-6">
          <Link className="hover:text-gray-400 transition" to="/ProductPage">Product</Link>
          <Link className="hover:text-gray-400 transition" to="/userPage">User</Link>
          <Link className="hover:text-gray-400 transition" to="/Purchese">Bought</Link>
          <Link className="hover:text-gray-400 transition" to="/auth">Auth</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
