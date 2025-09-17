import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const res = await API.post(
        endpoint,
        isRegister ? { name, email, password } : { email, password }
      );

      const { token, user, message } = res.data;

      // Save in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Success toast
      toast.success(message || (isRegister ? "Registered Successfully!" : "Login Successful!"), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // Navigate after a short delay so toast is visible
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      // ❌ Error toast
      toast.error(err.response?.data?.message || "Invalid credentials!", {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 relative">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505691938895-1758d7feb511')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isRegister
            ? "Register to explore amazing properties"
            : "Login to continue your real estate journey"}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300 shadow-lg"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </div>
  );
}
