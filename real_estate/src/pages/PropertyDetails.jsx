import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function PropertyDetails() {
  const { id } = useParams();
  const [prop, setProp] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
        <div className="p-8">
          {/* ---------- Main Slider ---------- */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation, Thumbs]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-[450px] rounded-xl"
          >
            {prop.images?.length > 0 ? (
              prop.images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={src || "https://via.placeholder.com/1200x400"}
                    alt={`property-${idx}`}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img
                  src="https://via.placeholder.com/1200x400?text=No+Image"
                  alt="no-img"
                  className="h-full w-full object-cover rounded-xl"
                />
              </SwiperSlide>
            )}
          </Swiper>

          {/* ---------- Thumbnail Slider ---------- */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            spaceBetween={10}
            slidesPerView={5}
            watchSlidesProgress
            className="mt-4"
          >
            {prop.images?.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src || "https://via.placeholder.com/200"}
                  alt={`thumb-${idx}`}
                  className="h-24 w-full object-cover rounded-xl cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-blue-400"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ---------- Price and Details ---------- */}
          <div className="mt-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">{prop.title}</h1>
            <span className="text-2xl font-semibold text-indigo-600">
              PKR {prop.price}
            </span>
          </div>

          <p className="text-gray-600 mt-2">
            {prop.location} ·{" "}
            <span className="font-semibold">{prop.category}</span>
          </p>

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
