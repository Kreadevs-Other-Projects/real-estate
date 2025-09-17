import React, { useEffect, useState } from "react";
import API from "../api/api";
import PropertyCard from "../components/PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [q, setQ] = useState("");

  const fetchProps = async () => {
    const res = await API.get("/properties", { params: { q } });
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProps();
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    fetchProps();
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1599423300746-b62533397364",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",   
  ];

  return (
    <div className="bg-gray-50">
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[70vh]"
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[70vh]">
                <img
                  src={img}
                  alt={`Hero ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
                    Find Your Dream Home
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-5xl mx-auto -mt-10 relative z-10">
        <form
          onSubmit={onSearch}
          className="flex items-center gap-3 bg-white shadow-xl rounded-xl p-3"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search city, title..."
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition">
            Search
          </button>
        </form>
      </div>


      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {properties.map((p) => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>

      <div className="bg-indigo-600 text-white mt-20 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-4">
          <div className="bg-indigo-700 rounded-2xl p-6 shadow-lg hover:bg-indigo-800 transition">
            <h3 className="text-2xl font-bold mb-2">Verified Listings</h3>
            <p>All properties are verified by our team for authenticity.</p>
          </div>
          <div className="bg-indigo-700 rounded-2xl p-6 shadow-lg hover:bg-indigo-800 transition">
            <h3 className="text-2xl font-bold mb-2">Secure Payments</h3>
            <p>Safe and transparent transactions with trusted agents.</p>
          </div>
          <div className="bg-indigo-700 rounded-2xl p-6 shadow-lg hover:bg-indigo-800 transition">
            <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
            <p>Our team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div>
            <h4 className="text-xl font-bold text-white mb-3">RealEstatePro</h4>
            <p>Your trusted partner in finding the perfect home.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/properties" className="hover:text-white">Properties</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
            <p>Email: support@realestatepro.com</p>
            <p>Phone: +92 300 1234567</p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6">
          © {new Date().getFullYear()} RealEstatePro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
