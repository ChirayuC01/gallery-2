"use client";

import { useState } from "react";
import Image from "next/image";
import { mediaList } from "@/lib/mediaList";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const Gallery = () => {
  const images = Object.entries(mediaList.images).flatMap(([category, imgs]) =>
    imgs.map((src, index) => ({
      src,
      title: `${category} - Image ${index + 1}`,
    }))
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const showNextImage = () => {
    if (selectedIndex !== null) {
      setLoading(true); // Start loading
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  };

  const showPrevImage = () => {
    if (selectedIndex !== null) {
      setLoading(true); // Start loading
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="container mx-auto md:p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Image Gallery
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map(({ src, title }, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedIndex(index);
              setLoading(true); // Start loading on selection
            }}
          >
            <Image
              src={src}
              alt={title}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-center text-sm mt-2 font-medium text-gray-700">
              {title}
            </p>
          </div>
        ))}
      </div>

      {/* Image Modal (Full View) */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="w-4/5 md:w-3/5 lg:w-2/5">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setSelectedIndex(null)}
            >
              ✖
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all"
              onClick={showPrevImage}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="w-12 h-12 animate-spin text-white" />
              </div>
            )}

            {/* Full-Size Image */}
            <Image
              src={images[selectedIndex].src}
              alt="Selected"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-xl"
              onLoadingComplete={() => setLoading(false)}
            />

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all"
              onClick={showNextImage}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
