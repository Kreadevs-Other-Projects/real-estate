import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative">
        <img
          src={Array.isArray(property.images)
            ? property.images[0]
            : property.images
              ? property.images.split(",")[0]
              : "https://via.placeholder.com/400x250?text=No+Image"}
          alt={property.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded-lg">
          PKR {property.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {property.location} ·{" "}
          <span className="font-medium">{property.category}</span>
        </p>

        <div className="mt-4 flex justify-end">
          <Link
            to={`/property/${property._id}`}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
