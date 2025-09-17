import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function PropertyDetails() {
  const { id } = useParams();
  const [prop, setProp] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await API.get(`/properties/${id}`);
      setProp(res.data);
    })();
  }, [id]);

  if (!prop) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium text-gray-600">
        Loading property details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={
              prop.images?.[0] ||
              "https://via.placeholder.com/1200x400?text=Property+Image"
            }
            alt={prop.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute bottom-5 left-5 bg-black/60 text-white px-4 py-2 rounded-xl">
            <span className="text-2xl font-bold">PKR {prop.price}</span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {prop.title}
              </h1>
              <p className="text-gray-600">
                {prop.location} ·{" "}
                <span className="font-semibold">{prop.category}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {prop.images?.map((src, idx) => (
              <img
                key={idx}
                src={src || "https://via.placeholder.com/200"}
                alt={`property-${idx}`}
                className="w-full h-56 object-cover rounded-xl shadow-sm hover:scale-105 transition duration-300"
              />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {prop.description || "No description provided."}
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-300">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
