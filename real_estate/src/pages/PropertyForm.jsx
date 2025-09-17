import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function PropertyForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    category: "Apartment",
    images: [],
  });
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("location", form.location);
      formData.append("category", form.category);

      // Append all selected files
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      await API.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating property");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 py-10 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="w-full max-w-2xl bg-white/95 rounded-2xl shadow-xl p-8 relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add Your Property
        </h2>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              placeholder="Beautiful 2 BHK Apartment"
              value={form.title}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              name="location"
              placeholder="Karachi, DHA Phase 5"
              value={form.location}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="e.g. 5000000"
              value={form.price}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Commercial</option>
              <option>Plot</option>
              <option>Villa</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write about your property..."
              value={form.description}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image URLs
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, images: e.target.files })
              }
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: jpg, png
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300"
          >
            Create Property
          </button>
        </form>
      </div>
    </div>
  );
}
