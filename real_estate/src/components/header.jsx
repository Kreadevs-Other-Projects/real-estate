import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Icon.png";
export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition"
        >
          <img src={logo} alt="" width={100} height={100}/>
        </Link>

        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-indigo-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/property/new"
            className="hover:text-indigo-600 transition duration-200"
          >
            Add Property
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition duration-300"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
